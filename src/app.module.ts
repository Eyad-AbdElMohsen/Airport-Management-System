import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { dbConfig } from './config/db.config';
import { APP_FILTER } from '@nestjs/core';
import { GeneralGqlExceptionFilter } from './common/filters/gql.filter';
import { GraphQLModule } from '@nestjs/graphql';
import { gqlConfig } from './config/gql.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      ...dbConfig,
    }),
    GraphQLModule.forRoot(gqlConfig),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GeneralGqlExceptionFilter,
    },
  ],
})
export class AppModule {}
