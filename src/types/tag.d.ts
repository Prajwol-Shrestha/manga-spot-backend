import { MangaTag } from "./manga"

export interface TagListResponse{
    result: string;
    response: string;
    data: MangaTag[];
    limit: number;
    offset: number;
    total: number;
}