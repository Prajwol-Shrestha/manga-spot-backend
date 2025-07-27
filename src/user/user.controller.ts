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
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/passport-jwt.guard';
import { UserService } from './user.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { AuthenticatedRequestJWT } from 'src/types/shared';
import { BaseUserDto, UserWithPasswordDto } from './dtos/user-output.dto';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: UserWithPasswordDto })
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getUserInfo(
    @Req() request: AuthenticatedRequestJWT,
  ): Promise<UserWithPasswordDto> {
    const username = request.user.userId;
    const result = await this.userService.findUserById(username);
    return result;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: BaseUserDto })
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
  @ApiOkResponse({ type: BaseUserDto })
  @Delete('me')
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Req() request: AuthenticatedRequestJWT) {
    const userId = request.user.userId;
    const result = await this.userService.deleteUser(userId);
    return result;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: BaseUserDto })
  @Get(':username')
  async getUserByUsername(@Param('username') username: string) {
    const result = await this.userService.findUserByName(username);
    return result;
  }
}
