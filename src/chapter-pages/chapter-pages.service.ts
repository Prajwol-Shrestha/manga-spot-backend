import { Injectable } from '@nestjs/common';
import { AxiosHttpService } from 'src/common/http/axios-http.service';
import { ENDPOINTS } from 'src/constants/endpoints';
import {
  ChapterPagesDto,
  ChapterPagesOutputDto,
} from './dtos/chapter-pages.dto';
import { MangaService } from 'src/manga/manga.service';
import { MangaEntityResponse } from 'src/types/manga';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ChapterPagesService {
  constructor(
    private httpService: AxiosHttpService,
    private mangaService: MangaService,
    private prismaService: PrismaService,
  ) {}

  async getChapterPages(chapterId: string, mangaId: string): Promise<any> {
    const chaptersPromise = this.httpService.get<ChapterPagesDto>(
      ENDPOINTS.getChapterPages.replace(':chapterId', chapterId),
    );
    const mangaDataPromise = this.mangaService.getMangaById(mangaId);
    const [chapterData, mangaData] = await Promise.all([
      chaptersPromise,
      mangaDataPromise,
    ]);
    const baseUrl = chapterData?.baseUrl;
    const images = chapterData?.chapter?.data?.map(
      (image) => `${baseUrl}/data/${chapterData.chapter.hash}/${image}`,
    );

    const finalPayload = {
      result: chapterData.result,
      count: images.length || 0,
      data: {
        chapterImages: images,
        mangaDetails: mangaData,
      },
    };

    return finalPayload;
  }

  async trackReadingHistory(event: any) {
    console.log(event, 'event')
    const alreadyInReading = await this.prismaService.readingHistory.findFirst({
      where: {
        userId: event.userId,
        mangaId: event.mangaId,
      },
    });
    if (alreadyInReading) {
      return this.prismaService.readingHistory.update({
        where: {
          mangaId: alreadyInReading.mangaId,
        },
        data: event,
      });
    }
    return this.prismaService.readingHistory.create({
      data: event,
    });
  }
}
