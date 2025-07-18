import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/passport-jwt.guard';
import { BookmarksService } from './bookmarks.service';
import { PaginationDto } from 'src/shared/dtos/pagination.dto';
import { AuthenticatedRequestJWT } from 'src/types/shared';
import { BookmarkDto, BookmarkOutputDto } from './dtos/bookmark-output.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { CreateBookMarkDto } from './dtos/create-bookmark.dto';

@Controller('bookmarks')
export class BookmarksController {
  constructor(private readonly bookmarkService: BookmarksService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get all bookmarks',
    type: BookmarkOutputDto,
  })
  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllBookmarks(
    @Req() req: AuthenticatedRequestJWT,
    @Query() pagination?: PaginationDto,
  ): Promise<BookmarkOutputDto> {
    const userId = req.user.userId;
    const result = await this.bookmarkService.getAllBookmarks(
      userId,
      pagination,
    );
    return result;
  }

  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({
    description: 'Create bookmark',
    type: BookmarkDto,
  })
  @Post()
  @UseGuards(JwtAuthGuard)
  async createBookmark(
    @Req() req: AuthenticatedRequestJWT,
    @Body() body: CreateBookMarkDto,
  ): Promise<BookmarkDto> {
    const userId = req.user.userId;
    const result = await this.bookmarkService.createBookmark(userId, body);
    return result;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Delete bookmark',
    type: BookmarkDto,
  })
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteBookmark(
    @Req() req: AuthenticatedRequestJWT,
    @Param('id') id: string,
  ) {
    const userId = req.user.userId;
    const result = await this.bookmarkService.deleteBookmark(userId, id);
    return result;
  }
}
