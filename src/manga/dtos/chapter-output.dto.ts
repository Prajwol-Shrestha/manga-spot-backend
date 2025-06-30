import { ApiProperty } from '@nestjs/swagger';

export class MangaTagDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  group: string;
}

export class MangaDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  lastVolume: string;

  @ApiProperty()
  lastChapter: string;

  @ApiProperty({ type: [MangaTagDto] })
  tags: MangaTagDto[];

  @ApiProperty()
  year: number;

  @ApiProperty()
  status: string;

  @ApiProperty()
  contentRating: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;
}

export class ChapterDataOutputDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ nullable: true })
  volume: string | null;

  @ApiProperty()
  chapter: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  publishAt: string;

  @ApiProperty()
  readableAt: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;

  @ApiProperty()
  pages: number;

  @ApiProperty({ type: MangaDto, required: false })
  manga?: MangaDto;
}

export class ChapterOutputData {
  @ApiProperty({ type: [ChapterDataOutputDto] })
  data: ChapterDataOutputDto[];

  @ApiProperty()
  response: string;

  @ApiProperty()
  result: string;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  offset: number;

  @ApiProperty()
  total: number;
}
