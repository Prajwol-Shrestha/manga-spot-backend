import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportLocalGuard } from './guards/passport-local.guard';
import { SignupDto } from './dtos/signup.dto';
import { Response } from 'express';
import { JwtAuthGuard } from './guards/passport-jwt.guard';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import {
  SafeUserOutputDto,
} from 'src/user/dtos/user-output.dto';
import { AuthenticatedRequest } from 'src/types/shared';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Login user',
    type: SafeUserOutputDto,
    isArray: false,
  })
  @Post('login')
  @UseGuards(PassportLocalGuard)
  async login(
    @Req() request: AuthenticatedRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.signIn(request.user);

    res.cookie('accessToken', user.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    return user;
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'Signup user',
    type: SafeUserOutputDto,
    isArray: false,
  })
  async signup(@Body() signUpData: SignupDto) {
    const user = await this.authService.signUp(signUpData);
    return user;
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Logout user',
    isArray: false,
  })
  @UseGuards(JwtAuthGuard)
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('accessToken', { path: '/' });
    return { message: 'Logged out' };
  }
}
