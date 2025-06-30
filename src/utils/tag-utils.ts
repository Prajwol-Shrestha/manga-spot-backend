import { MangaTag } from "src/types/manga";
import { getEnglishOrFirstProperty } from "./manga-utils";

export const transformTags = (tags: MangaTag[]) => {
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

    return modifiedTags
}