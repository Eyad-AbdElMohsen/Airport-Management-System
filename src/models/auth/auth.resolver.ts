import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthModel } from './auth.entity';
import { SignupInput } from './gql/signup.input';
import { AuthService } from './auth.service';
import { Auth } from './gql/auth.object';
import { LoginInput } from './gql/login.input';
import { GqlContext } from 'src/common/types/context.type';
import { UpdateRoleInput } from './gql/update.input';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/gaurds/auth.gaurd';
import { Roles } from 'src/common/decorators/roles.decoratore';
import { AuthRoles } from 'src/common/types/auth.type';
import { GraphQLJSONObject } from 'graphql-type-json';
import { BaseQueryInput } from 'src/common/inputs/BaseQuery.input';
import { ApiFeaturesPipe } from 'src/common/pipes/apiFeature.pipe';

@Resolver(() => AuthModel)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth)
  async signup(
    @Args('signupInput') signupInput: SignupInput,
  ): Promise<AuthModel> {
    return await this.authService.signup(signupInput);
  }

  @Mutation(() => GraphQLJSONObject)
  async login(
    @Args('loginInput') loginInput: LoginInput,
    @Context() context: GqlContext,
  ) {
    const { accessToken, refreshToken } =
      await this.authService.login(loginInput);

    context.res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { accessToken };
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Auth)
  async updateMyAuth(
    @Args('updateMyAuthInput') updateMyAuthInput: UpdateRoleInput,
    @Context() context: GqlContext,
  ): Promise<AuthModel> {
    const id = context.user!.id;
    return await this.authService.updateAuth(id, updateMyAuthInput);
  }

  @UseGuards(AuthGuard)
  @Roles(AuthRoles.admin)
  @Mutation(() => Auth)
  async updateRole(
    @Args('updateRoleInput') updateRoleInput: UpdateRoleInput,
    @Args('authId', ParseIntPipe) authId: number,
  ): Promise<AuthModel> {
    return await this.authService.updateAuth(authId, updateRoleInput);
  }

  @Query(() => [Auth])
  @UseGuards(AuthGuard)
  @Roles(AuthRoles.admin)
  async getAllAuth(
    @Args('query', ApiFeaturesPipe)
    options: BaseQueryInput,
  ): Promise<AuthModel[]> {
    return await this.authService.getAllAuth(options);
  }

  @Query(() => Auth)
  @UseGuards(AuthGuard)
  async getMyAuthDetails(@Context() context: GqlContext): Promise<AuthModel> {
    const id = context.user!.id;
    return await this.authService.getAuthById(id);
  }

  @Query(() => Auth)
  @UseGuards(AuthGuard)
  @Roles(AuthRoles.admin, AuthRoles.staff)
  async getAuthDetails(
    @Args('authId', ParseIntPipe) authId: number,
  ): Promise<AuthModel> {
    return await this.authService.getAuthById(authId);
  }

  @Mutation(() => GraphQLJSONObject)
  @UseGuards(AuthGuard)
  async deleteMyAuth(@Context() context: GqlContext) {
    const id = context.user!.id;
    return await this.authService.deleteAuth(id);
  }

  @Mutation(() => GraphQLJSONObject)
  @UseGuards(AuthGuard)
  @Roles(AuthRoles.admin)
  async deleteAuth(@Args('authId', ParseIntPipe) authId: number) {
    return await this.authService.deleteAuth(authId);
  }
}
