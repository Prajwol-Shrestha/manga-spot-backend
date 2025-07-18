import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReadingHistoryOutputDto } from './dtos/reading-history-output.dto';

@Injectable()
export class ReadingHistoryService {
  constructor(private primsaService: PrismaService) {}

  async getReadingHistory(userId: string): Promise<ReadingHistoryOutputDto[]> {
    return this.primsaService.readingHistory.findMany({
      where: {
        userId: userId,
      },
    });
  }
}
