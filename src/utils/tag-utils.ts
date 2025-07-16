import { MangaTag } from 'src/types/manga';
import { getEnglishOrFirstProperty } from './manga-utils';

export const transformTags = (tags: MangaTag[]) => {
  const modifiedTags = tags?.map((tag) => modifyTag(tag)) ?? [];

  return modifiedTags;
};

export const modifyTag = (tag: MangaTag) => {
  const {id, type, attributes } = tag ?? {};
  const { name, description, group } = attributes ?? {};
  const cleanName = getEnglishOrFirstProperty(name);
  const cleanDescription = getEnglishOrFirstProperty(description);
  return {
   id,
        type,
        group,
        name: cleanName,
        description: cleanDescription,
  };
};
