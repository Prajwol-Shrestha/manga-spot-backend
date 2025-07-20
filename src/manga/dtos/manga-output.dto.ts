import { ApiProperty } from '@nestjs/swagger';
import { BaseListMetaOutputDto } from 'src/shared/dtos/base-list-meta-output.dto';
import { TagDto } from 'src/tags/dtos/tag-output.dto';

export enum MangaStatus {
  ONGOING = 'Ongoing',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
  HIATUS = 'Hiatus',
}

export enum ContentRating {
  SAFE = 'safe',
  SUGGESTIVE = 'suggestive',
  EROTICA = 'erotica',
  PORNOGRAPHIC = 'pornographic',
}

export class MangaVolumeDto {
  @ApiProperty({
    description: 'Volume Number',
    example: '1',
  })
  volume: string;

  @ApiProperty({
    description: 'Chapters Array',
    example: [
      {
        chapter: '1',
        chapterId: 'a1b2c3d4-e5f6-7890-abcd-1234567890ef',
        isUnavailable: false,
      },
    ]
  })
  chapters: {
    chapter: string;
    chapterId: string;
    isUnavailable: boolean;
  }[];
}

export class MangaItemDto {
  @ApiProperty({
    description: 'Manga ID',
    example: 'a1b2c3d4-e5f6-7890-abcd-1234567890ef',
  })
  id: string;

  @ApiProperty({ description: 'Type of the manga', example: 'Manhua' })
  type: string;

  @ApiProperty({ description: 'Title of the manga', example: 'One Piece' })
  title: string;

  @ApiProperty({
    description: 'Description or synopsis of the manga',
    example: 'A story about pirates seeking treasure.',
  })
  description: string;

  @ApiProperty({ description: 'The last released volume', example: '102' })
  lastVolume: string;

  @ApiProperty({ description: 'The last released chapter', example: '1050' })
  lastChapter: string;

  @ApiProperty({ description: 'Release year of the manga', example: 1999 })
  year: number;

  @ApiProperty({
    description: 'Manga creation date',
    example: '2020-01-01T00:00:00Z',
  })
  createdAt: string;

  @ApiProperty({
    description: 'Manga last update date',
    example: '2024-12-01T12:00:00Z',
  })
  updatedAt: string;

  @ApiProperty({
    enum: MangaStatus,
    description: 'Publication status of the manga',
    example: MangaStatus.ONGOING,
  })
  status: MangaStatus;

  @ApiProperty({
    enum: ContentRating,
    description: 'Content rating of the manga',
    example: ContentRating.SAFE,
  })
  contentRating: ContentRating;

  @ApiProperty({
    type: [TagDto],
    description: 'Tags related to the manga',
  })
  tags: TagDto[];

  @ApiProperty({
    description: 'Name of the author',
    example: 'Eiichiro Oda',
    required: false,
  })
  author: string;

  @ApiProperty({
    description: 'Name of the artist',
    example: 'Eiichiro Oda',
    required: false,
  })
  artist: string;

  @ApiProperty({
    description: 'URL or identifier for the manga cover art',
    example: 'https://example.com/cover.jpg',
    required: false,
  })
  coverArt: string;

  @ApiProperty({
    description: 'Whether the current user has bookmarked the manga',
    example: true,
  })
  bookmarkedByMe: boolean;
}

export class MangaItemWithVolumesDto extends MangaItemDto {
  @ApiProperty({
    type: [MangaVolumeDto],
    description: 'List of volumes and chapters',
  })
  volumes: MangaVolumeDto[];
}

export class MangaOutputDto extends BaseListMetaOutputDto {
  @ApiProperty({
    type: [MangaItemDto],
    description: 'List of manga data items',
  })
  data: MangaItemDto[];
}