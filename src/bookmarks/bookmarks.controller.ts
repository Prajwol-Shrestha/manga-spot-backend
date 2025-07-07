import {
  Body,
  Controller,
  Delete,
  Get,
  NotImplementedException,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PassportJwtAuthGuard } from 'src/auth/guards/passport-jwt.guard';
import { BookmarksService } from './bookmarks.service';

@Controller('bookmarks')
export class BookmarksController {
  constructor(private readonly bookmarkService: BookmarksService) {}

  @Get()
  @UseGuards(PassportJwtAuthGuard)
  async getAllBookmarks(@Request() req) {
    const userId = req.user.userId;
    const result = await this.bookmarkService.getAllBookmarks(userId);
    return result;
  }

  @Post()
  @UseGuards(PassportJwtAuthGuard)
  async createBookmark(
    @Request() req,
    @Body() body: { mangaId: string; title: string; coverArt: string },
  ) {
    const userId = req.user.userId;
    const result = await this.bookmarkService.createBookmark(userId, body);
    return result;
  }

  @Delete(':id')
  async deleteBookmark(@Request() req, @Param('id') id: string) {
    const userId = req.user.userId;
    const result = await this.bookmarkService.deleteBookmark(userId, id);
    return result;
  }
}
