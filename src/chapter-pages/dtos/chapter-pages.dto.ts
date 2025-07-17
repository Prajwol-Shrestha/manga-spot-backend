import { MangaData } from "src/types/manga";

export class ChapterPagesDto {
    result: string;
    baseUrl: string;
    chapter: {
        hash: string;
        data: string[];
        dataSaver: string[]
    }
}

export class ChapterPagesOutputDto{
    result: string;
    count: number;
    data: {
        chapterImages: string[],
        mangaDetails: MangaData
    }
}