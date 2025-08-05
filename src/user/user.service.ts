import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { BaseUserDto, UserWithPasswordDto } from './dtos/user-output.dto';

@Injectable()
export class UserService {
  constructor(private PrismaService: PrismaService) {}

  async findUserById(id: string): Promise<UserWithPasswordDto> {
    const user = await this.PrismaService.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async findUserByName(username: string): Promise<BaseUserDto> {
    const user = await this.PrismaService.user.findUnique({
      where: {
        username: username,
      },
      omit: {
        password: true,
      },
    });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async updateUser(
    userId: string,
    input: UpdateUserDto,
  ): Promise<BaseUserDto> {
    const { username, ...safeUpdateUser } = input;

    await this.findUserById(userId);

    const user = await this.PrismaService.user.update({
      where: {
        id: userId,
      },
      data: safeUpdateUser,
    });

    const { password, ...safeUser } = user;

    return safeUser;
  }

  async deleteUser(userId: string): Promise<BaseUserDto> {
    const user = await this.findUserById(userId);
    const deletedUser = await this.PrismaService.user.delete({
      where: { id: user.id },
    });
    const { password, ...safeUser } = deletedUser;
    return safeUser;
  }
}
