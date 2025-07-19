import {
  Controller,
  Get,
  UseGuards,
  Delete,
  Patch,
  Body,
  Req,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/passport-jwt.guard';
import { UserService } from './user.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { AuthenticatedRequestJWT } from 'src/types/shared';
import { UserOutputDto } from './dtos/user-output.dto';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserOutputDto })
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getUserInfo(
    @Req() request: AuthenticatedRequestJWT,
  ): Promise<UserOutputDto> {
    const username = request.user.username;
    const result = await this.userService.findUserByName(username);
    return result;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserOutputDto })
  @Patch('me')
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @Req() request: AuthenticatedRequestJWT,
    @Body() input: UpdateUserDto,
  ) {
    const userId = request.user.userId;
    const result = await this.userService.updateUser(userId, input);
    return result;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserOutputDto })
  @Delete('me')
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Req() request: AuthenticatedRequestJWT) {
    const username = request.user.username;
    const result = await this.userService.deleteUser(username);
    return result;
  }
}
