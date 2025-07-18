import { Module } from '@nestjs/common';
import { ChaptersService } from './chapters.service';
import { ChaptersController } from './chapters.controller';
import { HttpModule } from 'src/common/http/http.module';
import { MangaModule } from 'src/manga/manga.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [ChaptersService],
  controllers: [ChaptersController],
  imports: [HttpModule, MangaModule, PrismaModule]
})
export class ChaptersModule {}
