import { Injectable } from '@nestjs/common'
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm'
import {
  getMetadataArgsStorage,
} from 'typeorm'

import {
  MLAB_DATABASE,
  MLAB_URL
} from '@environments'


@Injectable()
export class TypeormService implements TypeOrmOptionsFactory {
  async createTypeOrmOptions(): Promise<TypeOrmModuleOptions> {
    const options = {
      // ...config,
      url: MLAB_URL,
      type: 'mongodb',
      entities: getMetadataArgsStorage().tables.map(tbl => tbl.target),
      // migrations: ['src/modules/**/migration/*.ts'],
      // subscribers: ['src/modules/**/subscriber/*.ts'],
      // cli: {
      // 	entitiesDir: 'src/modules/**/entity',
      // 	migrationsDir: 'src/modules/**/migration',
      // 	subscribersDir: 'src/modules/**/subscriber'
      // },
      synchronize: true,
      autoLoadEntities: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      keepConnectionAlive: true,
      logging: true
    }
    return options
  }
}
