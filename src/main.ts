import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import { MyLogger } from '@config'
import { getConnection } from 'typeorm'
import * as helmet from 'helmet'
import * as rateLimit from 'express-rate-limit'
import * as chalk from 'chalk'

import {
  PORT,
  RATE_LIMIT_MAX,
  END_POINT,
  NODE_ENV,
  DOMAIN,
  PRIMARY_COLOR
} from '@environments'

declare const module: any;

async function bootstrap() {
  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
      logger: new MyLogger()
    });

    // const { isConnected } = getConnection('default')

    // isConnected ? Logger.log('Database connect', 'TypeORM', false)
    //   : Logger.error('Database connect error', '', 'TypeORM', false)

    app.use(helmet())

    app.use(
      rateLimit({
        windowMs: 1000 * 60 * 60, // an hour
        max: RATE_LIMIT_MAX!, // limit each IP to 100 requests per windowMs
        message:
          '⚠️  Too many request created from this IP, please try again after an hour'
      })
    )

    app.enableShutdownHooks()

    const server = await app.listen(PORT);

    if (module.hot) {
      module.hot.accept();
      module.hot.dispose(() => app.close());
    }

    NODE_ENV !== 'production'
      ? Logger.log(
        `🚀  Server ready at http://${DOMAIN!}:${chalk
          .hex(PRIMARY_COLOR!)
          .bold(`${PORT!}`)}/${END_POINT!}`,
        'Bootstrap',
        false
      )
      : Logger.log(
        `🚀  Server is listening on port ${chalk
          .hex(PRIMARY_COLOR!)
          .bold(`${PORT!}`)}`,
        'Bootstrap',
        false
      )

    NODE_ENV !== 'production' &&
      Logger.log(
        `🚀  Subscriptions ready at ws://${DOMAIN!}:${chalk
          .hex(PRIMARY_COLOR!)
          .bold(`${PORT!}`)}/${END_POINT!}`,
        'Bootstrap',
        false
      )

  } catch (error) {
    Logger.error(`❌  Error starting server, ${error}`, '', 'Bootstrap', false)
    process.exit()
  }
}
bootstrap().catch(e => {
  Logger.error(`❌  Error starting server, ${e}`, '', 'Bootstrap', false)
  throw e
})
