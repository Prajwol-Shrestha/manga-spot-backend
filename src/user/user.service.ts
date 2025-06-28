import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ISafeUser, IUser } from 'src/types/user';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(private PrismaService: PrismaService) {}

  async findUserByName(username: string): Promise<IUser | undefined> {
    const user = await this.PrismaService.user.findUnique({
      where: {
        username: username,
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
  ): Promise<ISafeUser | undefined> {
    const { username, ...safeUpdateUser } = input;
    const user = await this.PrismaService.user.update({
      where: {
        id: userId,
      },
      data: safeUpdateUser,
    });

    return user;
  }

  async deleteUser(username: string): Promise<any | undefined> {
    const user = await this.findUserByName(username);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const deletedUser = await this.PrismaService.user.delete({
      where: { username },
    });

    const { password, ...safeUser } = deletedUser;
    return safeUser;
  }
}
