import { Controller, Get, Param, Query, Req, UseGuards } from '@nestjs/common';
import { ChapterPagesService } from './chapter-pages.service';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { OptionalJwtAuthGuard } from 'src/auth/guards/optional-jwt.guard';

@Controller('chapter-pages')
export class ChapterPagesController {
  constructor(
    private readonly chapterPagesService: ChapterPagesService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Get(':id')
  @UseGuards(OptionalJwtAuthGuard)
  async getChapterPages(
    @Req() req,
    @Param() params: { id: string },
    @Query('mangaId') mangaId: string,
  ) {
    // console.log(req, 'req')
    const userId = req?.user?.userId;
    const { id: chapterId } = params;
    const data = await this.chapterPagesService.getChapterPages(
      chapterId,
      mangaId,
    );
    const mangaData = data?.data?.mangaDetails;
    const chapters = mangaData.volumes.flatMap((v) => v.chapters);
      const currentChapter = chapters.find((ch) => ch.chapterId === chapterId);

    const event = {
      userId,
      mangaId,
      chapterId,
      chapterNumber: currentChapter?.chapter,
      title: mangaData?.title,
      coverArt: mangaData?.coverArt,
    };
    if (userId) {
      this.eventEmitter.emit('reading.history', event);
    }
    return data;
  }

  @OnEvent('reading.history')
  async handleReadingHistoryEvent(event: any) {
    return this.chapterPagesService.trackReadingHistory(event);
  }
}
