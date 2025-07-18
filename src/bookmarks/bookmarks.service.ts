import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/shared/dtos/pagination.dto';
import { CreateBookMarkDto } from './dtos/create-bookmark.dto';
import { BookmarkDto, BookmarkOutputDto } from './dtos/bookmark-output.dto';

@Injectable()
export class BookmarksService {
  constructor(private prismaService: PrismaService) {}

  async getAllBookmarks(userId: string, pagination?: PaginationDto): Promise<BookmarkOutputDto> {
    const limit = pagination?.limit ?? 10;
    const offset = pagination?.offset ?? 0;
    const result = await this.prismaService.bookmark.findMany({
      where: {
        userId: userId,
      },
      skip: offset,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    });
    const count = await this.prismaService.bookmark.count({
      where: {
        userId: userId,
      },
    });
    return {
      total: count,
      limit: limit,
      offset: offset,
      data: result,
    };
  }

  async createBookmark(
    userId: string,
    data: CreateBookMarkDto,
  ): Promise<BookmarkDto> {
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

  async deleteBookmark(userId: string, mangaId: string): Promise<BookmarkDto>  {
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
