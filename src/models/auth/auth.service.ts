import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthRepo } from './auth.repository';
import { SignupInput } from './gql/signup.input';
import { compare, hash } from 'bcrypt';
import { LoginInput } from './gql/login.input';
import { JWT } from 'src/common/utils/jwt';
import { AuthRoles } from 'src/common/types/auth.type';
import { UpdateRoleInput } from './gql/update.input';
import { Transaction } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepo: AuthRepo,
    private readonly jwt: JWT,
    private readonly sequelize: Sequelize,
  ) {}

  async getAllAuth() {
    return await this.authRepo.getAll();
  }

  async getAuthById(id: number) {
    const auth = await this.authRepo.getById(id);
    if (!auth) throw new NotFoundException('No Auth Found');
    return auth;
  }

  async getAuthByEmail(email: string) {
    return await this.authRepo.getByEmail(email);
  }

  async signup(signupInput: SignupInput) {
    const isEmailExist = await this.getAuthByEmail(signupInput.email);
    if (isEmailExist) {
      throw new HttpException('Email is already exist', HttpStatus.BAD_REQUEST);
    }

    const hashedPass = await hash(signupInput.password, 10);
    signupInput.password = hashedPass;

    const transaction: Transaction = await this.sequelize.transaction();
    try {
      const newAuth = await this.authRepo.create(signupInput, transaction);
      return newAuth;
    } catch (err) {
      console.log('Error in signup: ', err);
      await transaction.rollback();
      throw new HttpException(
        'Transaction field, pls try again',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async login(loginInput: LoginInput) {
    const auth = await this.getAuthByEmail(loginInput.email);
    if (!auth) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPassValid = await compare(loginInput.password, auth.password);
    if (!isPassValid) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const tokens = this.jwt.generateJwtToken({
      id: auth.id,
      role: auth.role as AuthRoles,
    });

    return tokens;
  }

  async updateAuth(id: number, updateMyAuthInput: UpdateRoleInput) {
    await this.getAuthById(id);

    const [count, row] = await this.authRepo.update(id, updateMyAuthInput);
    if (!count)
      throw new HttpException(
        'No thing updated',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    return row[0].dataValues;
  }

  async deleteAuth(id: number) {
    const res = await this.authRepo.delete(id);
    if (!res) throw new NotFoundException('No Auth Found');
    return { message: 'Auth Deleted Successfully!' };
  }
}
