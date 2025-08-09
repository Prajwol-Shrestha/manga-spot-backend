import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportLocalGuard } from './guards/passport-local.guard';
import { SignupDto } from './dtos/signup.dto';
import { Response } from 'express';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { BaseUserDto } from 'src/user/dtos/user-output.dto';
import { LoginOutputDto } from './dtos/login-output.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Login user',
    type: LoginOutputDto,
    isArray: false,
  })
  @Post('login')
  @UseGuards(PassportLocalGuard)
  async login(
    @Req() request: Request & { user: BaseUserDto },
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.signIn(request.user);

    // res.cookie('accessToken', user.accessToken, {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: 'none',
    //   path: '/',
    //   maxAge: 1000 * 60 * 60 * 24 * 7,
    // });
    return user;
  }

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({
    description: 'Signup user',
    type: LoginOutputDto,
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
  async logout(@Res({ passthrough: true }) res: Response) {
    // res.clearCookie('accessToken', { path: '/' });
    return { message: 'Logged out' };
  }

  @Post('request-reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Request password reset user',
    isArray: false,
  })
  async requestPasswordReset(@Body('email') email: string) {
    const response = await this.authService.requestResetPassword(email);
    return response;
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Reset password user',
    isArray: false,
  })
  async resetPassword(
    @Body('email') email: string,
    @Body('token') token: string,
    @Body('newPassword') newPassword: string,
  ) {
    const response = await this.authService.resetPassword(
      email,
      token,
      newPassword,
    );
    return response;
  }
}
