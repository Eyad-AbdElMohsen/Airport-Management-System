import {
  BadRequestException,
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
import { Sequelize } from 'sequelize-typescript';
import { AuthQueryInput } from './gql/query.input';
import { randomBytes } from 'crypto';
import { MailService } from 'src/common/mail/mail.service';
import { VerifyInput } from './gql/verify.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepo: AuthRepo,
    private readonly jwt: JWT,
    private readonly sequelize: Sequelize,
    private readonly mailService: MailService,
  ) {}

  async getAllAuth(options: AuthQueryInput) {
    return await this.authRepo.getAll(options);
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
    const hashedPass = await hash(signupInput.password, 10);
    signupInput.password = hashedPass;

    const verificationCode = randomBytes(3).toString('hex'); // 6-digit hex string

    const auth = (
      await this.authRepo.create(signupInput, false, verificationCode)
    ).dataValues;

    await this.mailService.sendVerificationCode(auth.email, verificationCode);
    return auth;
  }

  async verifyAuth(verifyInput: VerifyInput) {
    const auth = await this.getAuthByEmail(verifyInput.email);
    if (!auth) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (auth.isVerified) throw new BadRequestException('Already Verified!');

    if (verifyInput.code !== auth.verificationCode) {
      throw new UnauthorizedException('Verification Code is not correct!');
    }

    await this.authRepo.updateVerification(auth.id);
    return true;
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

    const isVerified = auth.isVerified;
    if (!isVerified) {
      throw new UnauthorizedException('Email is not verfied!');
    }

    const tokens = this.jwt.generateJwtToken({
      id: auth.id,
      role: auth.role as AuthRoles,
    });

    return tokens;
  }

  async updateAuth(id: number, updateMyAuthInput: UpdateRoleInput) {
    await this.getAuthById(id);

    const [count, row] = await this.authRepo.updateRole(id, updateMyAuthInput);
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
