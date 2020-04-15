import { Module, CacheModule, } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import * as Resolvers from '@resolvers'
import { GraphQLModule } from '@nestjs/graphql';
import { GraphqlService } from '@config';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useClass: GraphqlService
    })
  ],
  controllers: [],
  providers: [
    ...Object.values(Resolvers)
  ],
})
export class AppModule { }
