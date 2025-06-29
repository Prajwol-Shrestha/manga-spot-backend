import { TagOutputDto } from './tag-output.dto';

export enum MangaStatus {
  ONGOING = 'Ongoing',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
  HIATUS = 'Hiatus',
}

export enum ContentRating {
  SAFE = 'Safe',
  SUGGESTIVE = 'Suggestive',
  EROTICA = 'erotica',
  PORNOGRAPHIC = 'pornographic',
}

export class MangaOutputDto {
  result: string;
  response: string;
  limit: number;
  offset: number;
  total: number;
  data: {
    id: string;
    title: string;
    description: string;
    lastVolume: string;
    lastChapter: string;
    year: number;
    createdAt: string;
    updatedAt: string;
    status: MangaStatus;
    contentRating: ContentRating;
    tags: TagOutputDto[];
  }[];
}