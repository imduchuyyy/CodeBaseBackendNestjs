import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule'

import { GraphqlService, TypeormService } from '@config';
import * as Resolvers from '@resolvers'

@Module({
  imports: [
    ScheduleModule.forRoot(),
    GraphQLModule.forRootAsync({
      useClass: GraphqlService
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeormService
    })
  ],
  controllers: [],
  providers: [
    ...Object.values(Resolvers)
  ],
})
export class AppModule { }
