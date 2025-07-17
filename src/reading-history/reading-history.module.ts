import { Module } from '@nestjs/common';
import { ReadingHistoryService } from './reading-history.service';
import { ReadingHistoryController } from './reading-history.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [ReadingHistoryService],
  controllers: [ReadingHistoryController],
  imports: [PrismaModule]
})
export class ReadingHistoryModule {}
