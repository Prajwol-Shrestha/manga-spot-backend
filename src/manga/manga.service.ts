import { Injectable } from '@nestjs/common';
import { AxiosHttpService } from 'src/common/http/axios-http.service';
import { ENDPOINTS } from 'src/constants/endpoints';
import {  MangaItemWithVolumesDto, MangaOutputDto } from './dtos/manga-output.dto';
import {
  mapManga,
  mapVolumeAndChapters,
} from 'src/utils/manga-utils';
import { MangaCollectionResponse, MangaEntityResponse } from 'src/types/manga';
import { MangaVolumesResponse } from 'src/types/volume';
import { BookmarksService } from 'src/bookmarks/bookmarks.service';
import { buildMangaDexQueryParams } from 'src/utils/query-utils';
// import { buildQueryParams } from 'src/utils/query-utils';

@Injectable()
export class MangaService {
  constructor(
    private readonly httpService: AxiosHttpService,
    private readonly bookmarkService: BookmarksService,
  ) {}

  async getManga(query: any, userId?: string): Promise<MangaOutputDto> {
    try {
      const bookmarks = await this.bookmarkService.getAllBookmarks(
        userId || '',
      );
      const result = await this.httpService.get<MangaCollectionResponse>(
        ENDPOINTS.getAllMangas,
        {
          params: query,
        },
      );

      const modifiedData = result?.data?.map((manga) => {
        const transformedData = mapManga(manga);
        return transformedData;
      });
      const bookmarkedFieldAddedData = modifiedData.map((manga) => {
        const hasBookMarked = bookmarks.data.some(
          (bookmark) => bookmark.mangaId === manga.id,
        );
        return {
          ...manga,
          bookmarkedByMe: hasBookMarked,
        };
      });
      return { ...result, data: bookmarkedFieldAddedData };
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }

  async getMangaById(id: string, userId?: string, query?: any): Promise<MangaItemWithVolumesDto> {
    try {
      const bookmarks = await this.bookmarkService.getAllBookmarks(
        userId || '',
      );
      const mangaDetailsPromise = this.httpService.get<MangaEntityResponse>(
        ENDPOINTS.getMangaById.replace(':id', id),
        {
          params: query
        }
      );
      const managaChaptersPromise = this.httpService.get<MangaVolumesResponse>(
        ENDPOINTS.getMangaAggregate.replace(':id', id),
      );
      const [mangaDetails, managaChapters] = await Promise.all([
        mangaDetailsPromise,
        managaChaptersPromise,
      ]);

      const transformedMangaData = mapManga(mangaDetails?.data);
      const transformedVolumeData = mapVolumeAndChapters(managaChapters);
      const finalResponse = {
        ...transformedMangaData,
        volumes: transformedVolumeData,
      };
      const hasBookMarked = bookmarks.data.some(
        (bookmark) => bookmark.mangaId === finalResponse.id,
      );
      return {
        ...finalResponse,
        bookmarkedByMe: hasBookMarked,
      };
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }

  async getRandomManga(query: any, userId?: string): Promise<MangaItemWithVolumesDto> {
    try {
      const bookmarks = await this.bookmarkService.getAllBookmarks(
        userId || '',
      );
      const mangaData = await this.httpService.get<MangaEntityResponse>(
        ENDPOINTS.getRandomManga,
        {
          params: query,
        },
      );
      const transformedData = mapManga(mangaData?.data);
      const volumeDetails = await this.httpService.get<MangaVolumesResponse>(
        ENDPOINTS.getMangaAggregate.replace(':id', transformedData.id),
      );
      const transformedVolumeData = mapVolumeAndChapters(volumeDetails);

      const finalResponse = {
        ...transformedData,
        volumes: transformedVolumeData,
      };
      const hasBookMarked = bookmarks.data.some(
        (bookmark) => bookmark.mangaId === finalResponse.id,
      );
      return {
        ...finalResponse,
        bookmarkedByMe: hasBookMarked,
      };
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }

}

// https://mangadex.org/covers/124a996f-197f-4f03-b5dd-ea753e5ae423/2fd461f7-977d-467a-8cce-316102f0da5f.png.512.jpg
