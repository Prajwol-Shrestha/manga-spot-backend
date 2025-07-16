import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  NotImplementedException,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportLocalGuard } from './guards/passport-local.guard';
import { SignupDto } from './dtos/signup.dto';
import { Response } from 'express';
import { JwtAuthGuard } from './guards/passport-jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UseGuards(PassportLocalGuard)
  async login(@Request() request, @Res({ passthrough: true }) res: Response) {
    const user = await this.authService.signIn(
      request.user,
    );

    res.cookie('accessToken', user.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    return user;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signup(@Body() signUpData: SignupDto) {
    const user = await this.authService.signUp(signUpData);
    return user;
  }

  @Get('logout')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('accessToken', { path: '/' });
    return { message: 'Logged out' };
  }
}
