import {
  Controller,
  Get,
  UseGuards,
  Request,
  Delete,
  Patch,
  Body,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/passport-jwt.guard';
import { UserService } from './user.service';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getUserInfo(@Request() request) {
    const username = request.user.username;
    const result = await this.userService.findUserByName(username);
    return result;
  }

  @Patch('me')
  @UseGuards(JwtAuthGuard)
  async updateProfile(@Request() request, @Body() input: UpdateUserDto) {
    const userId = request.user.userId;
    const result = await this.userService.updateUser(userId, input);
    return result;
  }

  @Delete('me')
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Request() request) {
    const username = request.user.username;
    const result = await this.userService.deleteUser(username);
    return result;
  }
}
