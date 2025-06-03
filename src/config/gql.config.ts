import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { Sequelize } from 'sequelize-typescript';
import { createLoaders } from 'src/common/loaders';
import { GqlContext } from 'src/common/types/context.type';

export const gqlConfig = (sequelize: Sequelize): ApolloDriverConfig => ({
  driver: ApolloDriver,
  autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  context: ({ req, res }): GqlContext => ({
    req,
    res,
    loaders: createLoaders(sequelize), // from loader/index
  }),
  formatError: (error) => {
    return {
      message: error.message,
      extensions: {
        code: error.extensions?.code || 500,
        path: error.path,
      },
    };
  },
});
