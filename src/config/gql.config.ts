import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

export const gqlConfig: ApolloDriverConfig = {
  driver: ApolloDriver,
  autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
  context: ({ req }) => ({ req }),
  formatError: (error) => {
    return {
      message: error.message,
      extensions: {
        code: error.extensions?.code || 500,
        resolver: error.path,
      },
    };
  },
};
