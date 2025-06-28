import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class UserService {
  constructor(private PrismaService: PrismaService) {}
  async findUserByName(username: string): Promise<any | undefined> {
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
}
