import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookmarksService {
  constructor(private prismaService: PrismaService) {}

  async getAllBookmarks(userId: string) {
    const result = await this.prismaService.bookmark.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return result;
  }

  async createBookmark(
    userId: string,
    data: { mangaId: string; title: string; coverArt: string },
  ) {
    const result = await this.prismaService.bookmark.create({
      data: {
        userId: userId,
        mangaId: data.mangaId,
        title: data.title,
        coverArt: data.coverArt,
      },
    });

    return result;
  }

  async deleteBookmark(userId: string, mangaId: string) {
    const result = await this.prismaService.bookmark.delete({
      where: {
        userId_mangaId: {
          userId: userId,
          mangaId: mangaId,
        },
      },
    });
    return result;
  }
}
