import { Module } from '@nestjs/common';
import { ChapterPagesController } from './chapter-pages.controller';
import { ChapterPagesService } from './chapter-pages.service';
import { HttpModule } from 'src/common/http/http.module';
import { MangaModule } from 'src/manga/manga.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ChapterPagesController],
  providers: [ChapterPagesService],
  imports: [HttpModule, MangaModule, PrismaModule]
})
export class ChapterPagesModule {}
