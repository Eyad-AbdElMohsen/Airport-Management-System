import { Query, Resolver } from '@nestjs/graphql';
import { AuthModel } from './auth.entity';
import { HttpException, HttpStatus } from '@nestjs/common';

@Resolver(() => AuthModel)
export class AuthResolver {

  @Query(() => String)
  sayHello(): string {
    throw new HttpException('error from resolver', HttpStatus.BAD_REQUEST)
    return 'Hello from GraphQL!';
  }
}
