export interface ChapterInfo {
  chapter: string;
  id: string;
  isUnavailable: boolean;
  others: string[];
  count: number;
}

export interface VolumeInfo {
  volume: string;
  count: number;
  chapters: Record<string, ChapterInfo>;
}

export interface MangaVolumesResponse {
  result: string;
  volumes: Record<string, VolumeInfo>;
}
