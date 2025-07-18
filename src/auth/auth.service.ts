import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { SignupDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';
import { ISafeUser } from 'src/types/user';
import { SafeUserOutputDto, UserOutputDto } from 'src/user/dtos/user-output.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async authenticate(input: LoginDto): Promise<SafeUserOutputDto> {
    const user = await this.validateUser(input);

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.signIn(user);
  }

  async validateUser(input: LoginDto): Promise<SafeUserOutputDto | null> {
    const user = await this.userService.findUserByName(input.username);
    if (user) {
      const isSamePassword = await bcrypt.compare(
        input.password,
        user.password!,
      );
      const { password, ...safeUser } = user;
      if (isSamePassword) {
        return safeUser;
      }
    }
    return null;
  }

  async signIn(user: SafeUserOutputDto): Promise<SafeUserOutputDto> {
    const tokenPayload = {
      sub: user.id,
      username: user.username,
    };

    const accessToken = await this.jwtService.signAsync(tokenPayload);

    return { accessToken, ...user };
  }

  async signUp(user: SignupDto) {
    const { email, username, password: inputPassword, name } = user;

    const existingEmail = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (existingEmail) {
      throw new BadRequestException('Email already in use');
    }

    const existingUsername = await this.prismaService.user.findUnique({
      where: { username },
    });
    if (existingUsername) {
      throw new BadRequestException('Username already taken');
    }

    const hashedPassword = await bcrypt.hash(inputPassword, 10);

    const newUser = await this.prismaService.user.create({
      data: {
        email,
        name,
        username,
        password: hashedPassword,
      },
    });
    const { password, ...safeUser } = newUser;

    const tokenPayload = {
      sub: newUser.id,
      username: newUser.username,
    };

    const accessToken = await this.jwtService.signAsync(tokenPayload);

    return { accessToken, ...safeUser };
  }
}
