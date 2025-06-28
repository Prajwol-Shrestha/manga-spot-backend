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

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UseGuards(PassportLocalGuard)
  async login(@Request() request) {
    const user = await this.authService.signIn(request.user);
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
  async logout(@Res() res) {
    return res.json({ message: 'Logged out' });
  }
}
