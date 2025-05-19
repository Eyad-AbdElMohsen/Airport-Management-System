import { Query, Resolver } from '@nestjs/graphql';
import { AuthModel } from './auth.entity';

@Resolver(() => AuthModel)
export class AuthResolver {

  @Query(() => String)
  sayHello(): string {
    return 'Hello from GraphQL!';
  }
}
