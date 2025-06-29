import { MangaData } from 'src/types/manga';
import { MangaVolumesResponse } from 'src/types/volume';

export const getEnglishOrFirstProperty = (obj: Record<string, any>): string => {
  return obj['en'] || obj[Object.keys(obj)[0]] || '';
};

export function mapManga(rawManga: MangaData) {
  const { id, type, attributes } = rawManga ?? {};
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

  const modifiedTags =
    tags?.map((tag) => {
      const { id, type, attributes } = tag ?? {};
      const { group, name, description } = attributes ?? {};
      const cleanName = getEnglishOrFirstProperty(name);
      const cleanDescription = getEnglishOrFirstProperty(description);

      return {
        id,
        type,
        group,
        name: cleanName,
        description: cleanDescription,
      };
    }) ?? [];

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
