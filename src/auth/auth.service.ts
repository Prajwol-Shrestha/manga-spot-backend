import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { SignupDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';
import { BaseUserDto } from 'src/user/dtos/user-output.dto';
import { LoginOutputDto } from './dtos/login-output.dto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private prismaService: PrismaService,
    private mailService: MailService,
  ) {}

  async authenticate(input: LoginDto): Promise<BaseUserDto> {
    const user = await this.validateUser(input);

    if (!user) {
      throw new UnauthorizedException();
    }

    return this.signIn(user);
  }

  async validateUser(input: LoginDto): Promise<BaseUserDto | null> {
    const user = await this.userService.findUserByName(input.username);
    const unsafeUser = await this.userService.findUserById(user.id);

    if (user) {
      const crypeted = await bcrypt.hash(input.password, 10);
      const isSamePassword = await bcrypt.compare(input.password, crypeted);
      const { password, ...safeUser } = unsafeUser;
      if (isSamePassword) {
        return safeUser;
      }
    }
    return null;
  }

  async signIn(user: BaseUserDto): Promise<LoginOutputDto> {
    const tokenPayload = {
      sub: user.id,
      username: user.username,
    };

    const accessToken = await this.jwtService.signAsync(tokenPayload);

    return { accessToken, ...user };
  }

  async signUp(user: SignupDto): Promise<LoginOutputDto> {
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

  async requestResetPassword(email: string) {
    const user = await this.userService.findUserByEmail(email);

    const token = crypto.randomBytes(32).toString('hex');
    const hashedToken = await bcrypt.hash(token, 10);

    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + 15);

    try {
      await this.prismaService.passwordresetToken.create({
        data: {
          userId: user.id,
          token: hashedToken,
          expiresAt: expiry,
        },
      });
  
      const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}&email=${email}`;
      await this.mailService.sendPasswordReset(email, resetLink);
  
      return { message: 'Password reset email sent' };
    } catch(error) {
      console.error('Error creating password reset token:', error);
      throw new Error('Failed to create password reset token');
    }

  }

  async resetPassword(email: string, token: string, newPassword: string) {
    const resetToken = await this.prismaService.passwordresetToken.findFirst({
      where: {
        user: { email },
        expiresAt: { gt: new Date() },
      },
      include: { user: true },
    });

    if (!resetToken) throw new BadRequestException('Invalid or expired token');

    const decodedToken = decodeURIComponent(token);
    const isValid = await bcrypt.compare(decodedToken, resetToken.token);
    
    if (!isValid) throw new BadRequestException('Invalid token');

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.prismaService.user.update({
      where: { id: resetToken.userId },
      data: { password: hashedPassword },
    });

    await this.prismaService.passwordresetToken.delete({
      where: { id: resetToken.id },
    });

    return { message: 'Password reset successful' };
  }
}
