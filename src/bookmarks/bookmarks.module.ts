import { Module } from '@nestjs/common';
import { BookmarksController } from './bookmarks.controller';
import { BookmarksService } from './bookmarks.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [BookmarksController],
  providers: [BookmarksService],
  imports: [PrismaModule]
})
export class BookmarksModule {}
