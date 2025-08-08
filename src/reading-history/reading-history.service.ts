import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ReadingHistoryOutputDto } from './dtos/reading-history-output.dto';
import { getProxiedImageUrl } from 'src/utils/getImage';

@Injectable()
export class ReadingHistoryService {
  constructor(private primsaService: PrismaService) {}

  async getReadingHistory(userId: string): Promise<ReadingHistoryOutputDto[]> {
    const result = await this.primsaService.readingHistory.findMany({
      where: {
        userId: userId,
      },
    })

    const proxiedUrlHistory = result.map(history => {
      const proxiedUrl = getProxiedImageUrl(history.coverArt)
      return ({
        ...history,
        coverArt: proxiedUrl
      })
    })

    return proxiedUrlHistory;
  }
}
