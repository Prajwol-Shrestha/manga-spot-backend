import { Module } from '@nestjs/common';
import { ChapterPagesController } from './chapter-pages.controller';
import { ChapterPagesService } from './chapter-pages.service';
import { HttpModule } from 'src/common/http/http.module';

@Module({
  controllers: [ChapterPagesController],
  providers: [ChapterPagesService],
  imports: [HttpModule]
})
export class ChapterPagesModule {}
