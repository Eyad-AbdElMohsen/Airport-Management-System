import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { GqlContext } from 'src/common/types/context.type';

export const gqlConfig: ApolloDriverConfig = {
  driver: ApolloDriver,
  autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  context: ({ req, res }): GqlContext => ({ req, res }),
  formatError: (error) => {
    return {
      message: error.message,
      extensions: {
        code: error.extensions?.code || 500,
        path: error.path,
      },
    };
  },
};
