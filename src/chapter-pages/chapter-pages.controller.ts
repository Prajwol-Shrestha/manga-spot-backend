import { Controller, Get, Param } from '@nestjs/common';
import { ChapterPagesService } from './chapter-pages.service';

@Controller('chapter-pages')
export class ChapterPagesController {
  constructor(private readonly chapterPagesService: ChapterPagesService) {}

  @Get(':id')
  getChapterPages(@Param() params: { id: string }) {
    const { id: chapterId } = params;
    return this.chapterPagesService.getChapterPages(chapterId);
  }
}
