import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Injectable } from '@nestjs/common';
import { Context } from 'graphql-ws';
import { JwtPayload } from 'jsonwebtoken';
import { join } from 'path';
import { Sequelize } from 'sequelize-typescript';
import { createLoaders } from 'src/common/loaders';
import { GqlContext } from 'src/common/types/context.type';
import { JWT } from 'src/common/utils/jwt';

@Injectable()
export class GqlConfigService {
  constructor(private jwt: JWT) {}

  createGqlConfig(sequelize: Sequelize): ApolloDriverConfig {
    return {
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      installSubscriptionHandlers: true,
      subscriptions: {
        'graphql-ws': {
          // // Authorization
          // onConnect: (context) => {
          //   const { connectionParams, extra } = context;
          //   // const token = connectionParams?.authToken as string;
          //   const token =
          //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzQ5MTM2MzM0LCJleHAiOjE3NDkxMzcyMzR9.GQxMehcaLR9_kbuV1gCp59t1_s7cyew55MTY0zGz01w';
          //   try {
          //     const user = this.jwt.validateAccessToken(token);
          //     (extra as { user?: JwtPayload }).user = user;
          //     return { user };
          //   } catch (err) {
          //     console.error('Subscription auth error:', err.message);
          //     return false;
          //   }
          // },
          path: '/graphql',
        },
        'subscriptions-transport-ws': true,
      },
      context: ({ req, res, extra }): GqlContext => ({
        req,
        res,
        // extra,
        loaders: createLoaders(sequelize),
      }),
      formatError: (error) => ({
        message: error.message,
        extensions: {
          code: error.extensions?.code || 500,
          path: error.path,
        },
      }),
    };
  }
}
