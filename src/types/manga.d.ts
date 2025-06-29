import { ContentRating, MangaStatus } from "src/manga/dtos/manga-output.dto";

export interface BaseApiResponse {
  result: string;
  response: 'entity' | 'collection';
}

// ========== Entity (Single Manga) ==========
export interface MangaEntityResponse extends BaseApiResponse {
  response: 'entity';
  data: MangaData;
}

// ========== Collection (Manga List) ==========
export interface MangaCollectionResponse extends BaseApiResponse {
  response: 'collection';
  data: MangaData[];
  limit: number;
  offset: number;
  total: number;
}

// ========== Shared Types ==========
export interface MangaData {
  id: string;
  type: string;
  attributes: MangaAttributes;
  relationships: MangaRelationship[];
}

export interface MangaAttributes {
  title: LocalizedText;
  altTitles: LocalizedText[];
  description: LocalizedText;
  isLocked: boolean;
  links: Record<string, string>;
  originalLanguage: string;
  lastVolume: string;
  lastChapter: string;
  publicationDemographic: string;
  status: MangaStatus;
  year: number;
  contentRating: ContentRating;
  tags: MangaTag[];
  state: string;
  chapterNumbersResetOnNewVolume: boolean;
  createdAt: string;
  updatedAt: string;
  version: number;
  availableTranslatedLanguages: string[];
  latestUploadedChapter: string;
}

// export type MangaStatus = 'ongoing' | 'completed' | 'hiatus' | 'cancelled';

export interface MangaTag {
  id: string;
  type: 'tag';
  attributes: {
    name: LocalizedText;
    description: LocalizedText;
    group: string;
    version: number;
  };
  relationships: any[];
}

export interface MangaRelationship {
  id: string;
  type: string;
  attributes?: {
    description?: string;
    volume?: string;
    fileName?: string;
    locale?: string;
    createdAt?: string;
    updatedAt?: string;
    version?: number;
  };
}

export interface LocalizedText {
  [locale: string]: string;
}
