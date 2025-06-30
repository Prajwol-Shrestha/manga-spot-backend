// Root response
export interface IChapterApiResponse {
  result: string;
  response: string;
  data: IChapterData[];
  limit: number;
  offset: number;
  total: number;
}

// Chapter Data
export interface IChapterData {
  id: string;
  type: "chapter";
  attributes: IChapterAttributes;
  relationships: IRelationship[];
}

// Chapter Attributes
export interface IChapterAttributes {
  volume: string | null;
  chapter: string;
  title: string;
  translatedLanguage: string;
  externalUrl: string;
  isUnavailable: boolean;
  publishAt: string;
  readableAt: string;
  createdAt: string;
  updatedAt: string;
  pages: number;
  version: number;
}

// Base Relationship Interface
export interface IBaseRelationship {
  id: string;
  type: string;
  attributes?: any;
}

// Scanlation Group Relationship
export interface IScanlationGroupRelationship extends IBaseRelationship {
  type: "scanlation_group";
  attributes: IScanlationGroupAttributes;
}

// Manga Relationship
export interface IMangaRelationship extends IBaseRelationship {
  type: "manga";
  attributes: IMangaAttributes;
}

// User Relationship
export interface IUserRelationship extends IBaseRelationship {
  type: "user";
  attributes: IUserAttributes;
}

// Relationship Union
export type IRelationship =
  | IScanlationGroupRelationship
  | IMangaRelationship
  | IUserRelationship;

// Scanlation Group Attributes
export interface IScanlationGroupAttributes {
  name: string;
  altNames: string[];
  locked: boolean;
  website: string;
  ircServer: string | null;
  ircChannel: string | null;
  discord: string;
  contactEmail: string;
  description: string;
  twitter: string;
  mangaUpdates: string | null;
  focusedLanguages: string[];
  official: boolean;
  verified: boolean;
  inactive: boolean;
  publishDelay: string | null;
  exLicensed: boolean;
  createdAt: string;
  updatedAt: string;
  version: number;
}

// Manga Attributes
export interface IMangaAttributes {
  title: { en: string };
  altTitles: Record<string, string>[];
  description: { en: string };
  isLocked: boolean;
  links: { engtl: string };
  originalLanguage: string;
  lastVolume: string;
  lastChapter: string;
  publicationDemographic: string | null;
  status: string;
  year: number;
  contentRating: string;
  tags: ITag[];
  state: string;
  chapterNumbersResetOnNewVolume: boolean;
  createdAt: string;
  updatedAt: string;
  version: number;
  availableTranslatedLanguages: string[];
  latestUploadedChapter: string | null;
}

// Tag
export interface ITag {
  id: string;
  type: "tag";
  attributes: {
    name: { en: string };
    description: Record<string, string>;
    group: string;
    version: number;
  };
  relationships: any[];
}

// User Attributes
export interface IUserAttributes {
  username: string;
  roles: string[];
  version: number;
}
