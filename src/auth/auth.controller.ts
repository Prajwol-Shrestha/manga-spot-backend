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

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UseGuards(PassportLocalGuard)
  async login(@Request() request, @Res({passthrough: true}) res: Response) {
    const { accessToken, ...user } = await this.authService.signIn(request.user);
    
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7
    })
    return user;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signup(@Body() signUpData: SignupDto) {
    const user = await this.authService.signUp(signUpData);
    return user;
  }

  @Get('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token', {path: '/'});
    return {message: 'Logged out'}
  }
}
