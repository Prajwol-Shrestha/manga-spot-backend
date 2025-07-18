import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ChaptersService } from './chapters.service';
import { LatestUpdatedChaptersResponseDto } from './dtos/chapter-output.dto';
import { OptionalJwtAuthGuard } from 'src/auth/guards/optional-jwt.guard';
import { AuthenticatedRequestJWT } from 'src/types/shared';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { ApiOkResponse } from '@nestjs/swagger';
import { ChapterPagesOutputDto } from './dtos/chapter-pages.dto';

export  interface IReadingHistoryEvent {
  userId: string;
  mangaId: string;
  chapterId: string;
  chapterNumber: string;
  title: string;
  coverArt: string;
}

@Controller('chapters')
export class ChaptersController {
  constructor(
    private readonly chapterService: ChaptersService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'List of latest updated chapters',
    type: LatestUpdatedChaptersResponseDto,
    isArray: false,
  })
  @Get('latest-updated')
  async getChapters(
    @Query() query: any,
  ): Promise<LatestUpdatedChaptersResponseDto> {
    const result = await this.chapterService.getChapters(query);
    return result;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'List of chapters pages and manga details',
    type: ChapterPagesOutputDto,
    isArray: false,
  })
  @Get(':id')
  @UseGuards(OptionalJwtAuthGuard)
  async getChapterPages(
    @Req() req: AuthenticatedRequestJWT,
    @Param('id') params: { id: string },
    @Query('mangaId') mangaId: string,
  ): Promise<ChapterPagesOutputDto> {
    const userId = req?.user?.userId;
    const { id: chapterId } = params;
    const data = await this.chapterService.getChapterPages(chapterId, mangaId);
    const mangaData = data?.data?.mangaDetails;
    const chapters = mangaData.volumes.flatMap((v) => v.chapters);
    const currentChapter = chapters.find((ch) => ch.chapterId === chapterId);

    const event: IReadingHistoryEvent = {
      userId,
      mangaId,
      chapterId,
      chapterNumber: currentChapter?.chapter || '0',
      title: mangaData.title,
      coverArt: mangaData.coverArt,
    };
    if (userId) {
      this.eventEmitter.emit('reading.history', event);
    }
    return data;
  }

  @OnEvent('reading.history')
  async handleReadingHistoryEvent(event: IReadingHistoryEvent) {
    await this.chapterService.trackReadingHistory(event);
  }
}
