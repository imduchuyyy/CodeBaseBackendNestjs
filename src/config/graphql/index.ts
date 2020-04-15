import { Injectable, Logger } from "@nestjs/common";
import { GqlOptionsFactory, GqlModuleOptions } from "@nestjs/graphql";
import { AuthenticationError, ForbiddenError } from 'apollo-server-core'
import { PubSub } from 'graphql-subscriptions'
import { getMongoRepository } from 'typeorm'

import { UserEntity } from '@models'
import schemaDirectives from './schemaDerectives'
import { verifyToken } from '@auth'
import { END_POINT, ACCESS_TOKEN } from "@environments";

const pubsub = new PubSub()

@Injectable()
export class GraphqlService implements GqlOptionsFactory {
  async createGqlOptions(): Promise<GqlModuleOptions> {
    return {
      typePaths: ['./**/*.graphql'],
      playground: true,
      debug: true,
      schemaDirectives,
      formatError: err => {
        return {
          message: err.message,
          code: err.extensions && err.extensions.code,
          locations: err.locations,
          path: err.path
        }
      },
      formatResponse: res => {
        return res
      },
      path: `/${END_POINT}`,
      bodyParserConfig: {
        limit: '50mb'
      },
      uploads: {
        maxFieldSize: 2, // 1mb
        maxFileSize: 20, // 20mb
        maxFiles: 5
      },
      installSubscriptionHandlers: true,
      context: async ({ req, res, connection }) => {
        if (connection) {
          const { currentUser } = connection.context

          return {
            pubsub,
            currentUser
          }
        }
        let currentUser

        // console.log(ACCESS_TOKEN, req.headers)

        const token = req.headers[ACCESS_TOKEN!] || ''

        if (token) {
          currentUser = await verifyToken(token)
        }

        return {
          req,
          res,
          pubsub,
          currentUser,
        }
      },
      subscriptions: {
        path: `/${END_POINT}`,
        keepAlive: 1000,
        onConnect: async (connectionParams, webSocket, context) => {
          Logger.debug(`🔗  Connected to websocket`, 'GraphQL')
          let currentUser

          const token = connectionParams[ACCESS_TOKEN!]
          if (token) {
            currentUser = await verifyToken(token)

            await getMongoRepository(UserEntity).updateOne(
              { _id: currentUser._id },
              {
                $set: { isOnline: true }
              },
              {
                upsert: true
              }
            )

            return { currentUser }
          }

          throw new AuthenticationError(
            'Authentication token is invalid, please try again.'
          )
        },
        onDisconnect: async (webSocket, context) => {
          Logger.error(`❌  Disconnected to websocket`, '', 'GraphQL', false)

          const { initPromise } = context
          const { currentUser } = await initPromise

          await getMongoRepository(UserEntity).updateOne(
            { _id: currentUser._id },
            {
              $set: { isOnline: false }
            },
            {
              upsert: true
            }
          )
        }
      }
    }
  }
}