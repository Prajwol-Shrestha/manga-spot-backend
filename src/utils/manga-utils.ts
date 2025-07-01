import { IChapterData } from 'src/types/chapter';
import { MangaData } from 'src/types/manga';
import { MangaVolumesResponse } from 'src/types/volume';
import { transformTags } from './tag-utils';
import { ChapterDataOutputDto } from 'src/manga/dtos/chapter-output.dto';

export const getEnglishOrFirstProperty = (obj: Record<string, any>): string => {
  return obj['en'] || obj[Object.keys(obj)[0]] || '';
};

export function mapManga(rawManga: MangaData) {
  const { id, type, attributes, relationships } = rawManga ?? {};
  const {
    title,
    description,
    lastVolume,
    lastChapter,
    tags,
    year,
    status,
    contentRating,
    createdAt,
    updatedAt,
  } = attributes ?? {};

  const englishOrFirstTitle = getEnglishOrFirstProperty(title);
  const englishOrFirstDescription = getEnglishOrFirstProperty(description);

  const modifiedTags = transformTags(tags);

  const meta = {
    author: '',
    artist: '',
    coverArt: '',
  };
  relationships?.forEach((relation) => {
    if (relation.type === 'author' && relation?.attributes) {
      meta.author = relation?.attributes.name || '';
    }
    if (relation.type === 'artist' && relation?.attributes) {
      meta.artist = relation?.attributes.name || '';
    }
    if (relation.type === 'cover_art' && relation?.attributes) {
      meta.coverArt =
        ` https://mangadex.org/covers/${id}/${relation?.attributes.fileName}` ||
        '';
    }
  });

  return {
    id,
    type,
    title: englishOrFirstTitle,
    description: englishOrFirstDescription,
    lastVolume,
    lastChapter,
    tags: modifiedTags,
    year,
    status,
    contentRating,
    createdAt,
    updatedAt,
    ...meta,
  };
}

interface MappedChapter {
  chapter: string;
  chapterId: string;
  isUnavailable: boolean;
}

export interface MappedVolume {
  volume: string;
  chapters: MappedChapter[];
}

export function mapVolumeAndChapters(
  rawVolumes: MangaVolumesResponse,
): MappedVolume[] {
  const volumes = rawVolumes?.volumes ?? {};
  const result: MappedVolume[] = [];

  for (const [_, volumeData] of Object.entries(volumes)) {
    const rawChapters = volumeData?.chapters ?? {};
    const chapters: MappedChapter[] = [];

    for (const [_, chapterValue] of Object.entries(rawChapters)) {
      chapters.push({
        chapter: chapterValue.chapter,
        chapterId: chapterValue.id,
        isUnavailable: chapterValue.isUnavailable,
      });
    }

    result.push({
      volume: volumeData.volume,
      chapters,
    });
  }

  return result;
}

export function transformChaptersData(chapters: IChapterData[]) {
  const transformed = chapters?.map((chapter) => {    
    const { id: chapterId, attributes, relationships } = chapter ?? {};
    const {translatedLanguage, externalUrl, isUnavailable, version, ...rest } =
    attributes ?? {};
    
    const payload: ChapterDataOutputDto = {
      ...rest,
      id: chapterId,
      mangaId: ''
    };

    relationships?.forEach((relation) => {
      if (relation.type === 'manga') {
        payload.mangaId = relation?.id;
        // const mangaAttributes = relation?.attributes;
        // const manga = {
        //   id: relation.id,
        //   title: getEnglishOrFirstProperty(mangaAttributes.title),
        //   description: getEnglishOrFirstProperty(mangaAttributes.description),
        //   lastVolume: mangaAttributes.lastVolume,
        //   lastChapter: mangaAttributes.lastChapter,
        //   tags: transformTags(mangaAttributes.tags),
        //   year: mangaAttributes.year,
        //   status: mangaAttributes.status,
        //   contentRating: mangaAttributes.contentRating,
        //   createdAt: mangaAttributes.createdAt,
        //   updatedAt: mangaAttributes.updatedAt,
        // };
        // payload.manga = manga;
      }
      if(relation.type === 'scanlation_group' && relation?.attributes) {
        payload.scanlator = relation?.attributes.name;
      }
    });

    return payload
  });

  return transformed
}
