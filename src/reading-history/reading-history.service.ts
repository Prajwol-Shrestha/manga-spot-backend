import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReadingHistoryService {
  constructor(private primsaService: PrismaService) {}

  async getReadingHistory(userId: string) {
    return this.primsaService.readingHistory.findMany({
      where: {
        userId: userId,
      },
    });
  }
}
