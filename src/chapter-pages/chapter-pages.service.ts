import { Injectable } from '@nestjs/common';
import { AxiosHttpService } from 'src/common/http/axios-http.service';
import { ENDPOINTS } from 'src/constants/endpoints';
import {
  ChapterPagesDto,
  ChapterPagesOutputDto,
} from './dtos/chapter-pages.dto';

@Injectable()
export class ChapterPagesService {
  constructor(private httpService: AxiosHttpService) {}

  async getChapterPages(chapterId: string): Promise<ChapterPagesOutputDto> {
    const data = await this.httpService.get<ChapterPagesDto>(
      ENDPOINTS.getChapterPages.replace(':chapterId', chapterId),
    );
    const baseUrl = data?.baseUrl;
    const images = data?.chapter?.data?.map(
      (image) => `${baseUrl}/data/${data.chapter.hash}/${image}`,
    );
    return {
      result: data.result,
      count: images.length || 0,
      images,
    };
  }
}
