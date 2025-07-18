import { Injectable } from '@nestjs/common';
import { AxiosHttpService } from 'src/common/http/axios-http.service';
import { ENDPOINTS } from 'src/constants/endpoints';
import { ContentRating } from 'src/manga/dtos/manga-output.dto';
import { MangaService } from 'src/manga/manga.service';
import { IChapterApiResponse } from 'src/types/chapter';
import { transformChaptersData } from 'src/utils/manga-utils';
import {
  LatestUpdatedChapterDto,
  LatestUpdatedChaptersResponseDto,
} from './dtos/chapter-output.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ChapterPagesDto } from './dtos/chapter-pages.dto';

@Injectable()
export class ChaptersService {
  constructor(
    private readonly httpService: AxiosHttpService,
    private readonly mangaService: MangaService,
    private readonly prismaService: PrismaService,
  ) {}

  // not related to any specific manga
  async getChapters(query: any): Promise<LatestUpdatedChaptersResponseDto> {
    try {
      const result = await this.httpService.get<IChapterApiResponse>(
        ENDPOINTS.getChaptersList,
        {
          params: query,
        },
      );

      const transformedData = transformChaptersData(result?.data);
      const mangaIds = transformedData.map((chapter) => chapter?.mangaId);

      const params = {
        limit: mangaIds.length,
        offset: 0,
        ids: mangaIds,
        contentRating: [
          ContentRating.SAFE,
          ContentRating.SUGGESTIVE,
          ContentRating.EROTICA,
          ContentRating.PORNOGRAPHIC,
        ],
        includes: ['cover_art'],
      };
      const mangaData = await this.mangaService.getManga(params);
      const actualMangaData = mangaData?.data || [];

      // map manga data with chapter data
      const mappedData: LatestUpdatedChapterDto[] = transformedData.map(
        (chapter) => {
          const manga = actualMangaData.find(
            (manga) => manga.id === chapter.mangaId,
          );
          return {
            ...chapter,
            manga,
          };
        },
      );

      const finalResponse = {
        ...result,
        data: mappedData,
      };
      return finalResponse;
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }

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
    console.log(event, 'event');
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
