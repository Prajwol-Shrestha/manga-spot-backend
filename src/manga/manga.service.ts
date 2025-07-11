import { Injectable } from '@nestjs/common';
import { AxiosHttpService } from 'src/common/http/axios-http.service';
import { ENDPOINTS } from 'src/constants/endpoints';
import { ContentRating, MangaOutputDto } from './dtos/manga-output.dto';
import {
  getEnglishOrFirstProperty,
  mapManga,
  mapVolumeAndChapters,
  transformChaptersData,
} from 'src/utils/manga-utils';
import { GetMangaQueryDto } from './dtos/get-manga-query.dto';
import { buildQueryParams } from 'src/utils/query-utils';
import { MangaCollectionResponse, MangaEntityResponse } from 'src/types/manga';
import { MangaVolumesResponse } from 'src/types/volume';
import { TagListResponse } from 'src/types/tag';
import { TagOutputDto } from './dtos/tag-output.dto';
import { IChapterApiResponse } from 'src/types/chapter';
import { ChapterOutputData } from './dtos/chapter-output.dto';
import { BookmarksService } from 'src/bookmarks/bookmarks.service';

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
        const hasBookMarked = bookmarks.some(
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

  async getManagaById(id: string, userId?: string, query?: any) {
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
      const hasBookMarked = bookmarks.some(
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

  async getRandomManga(query: any, userId?: string) {
    try {
      const bookmarks = await this.bookmarkService.getAllBookmarks(
        userId || '',
      );
      const queryParams = buildQueryParams(query);
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
      console.log(transformedVolumeData, 'volumeDetails')

      const finalResponse = {
        ...transformedData,
        volumes: transformedVolumeData,
      };
      const hasBookMarked = bookmarks.some(
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

  async getAllTags(): Promise<TagOutputDto[]> {
    try {
      const result = await this.httpService.get<TagListResponse>(
        ENDPOINTS.getMangaTagList,
      );
      const transformed = result?.data?.map((tag) => {
        const { id, type, attributes } = tag;
        const { name, description, group } = attributes;
        const cleanName = getEnglishOrFirstProperty(name);
        const cleanDescription = getEnglishOrFirstProperty(description);
        return {
          id,
          type,
          group,
          name: cleanName,
          description: cleanDescription,
        };
      });
      return transformed;
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }

  // not related to any specific manga
  async getChapters(query: any): Promise<ChapterOutputData> {
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
      const mangaData = await this.getManga(params);
      const actualMangaData = mangaData?.data || [];

      // map manga data with chapter data
      const mappedData = transformedData.map((chapter) => {
        const manga = actualMangaData.find(
          (manga) => manga.id === chapter.mangaId,
        );
        return {
          ...chapter,
          manga,
        };
      });

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
}

// https://mangadex.org/covers/124a996f-197f-4f03-b5dd-ea753e5ae423/2fd461f7-977d-467a-8cce-316102f0da5f.png.512.jpg
