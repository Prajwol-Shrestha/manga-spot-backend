import { ApiProperty } from "@nestjs/swagger";
import { MangaItemDto } from "src/manga/dtos/manga-output.dto";
import { BaseListMetaOutputDto } from "src/shared/dtos/base-list-meta-output.dto";

export class LatestUpdatedChapterDto {
  @ApiProperty({
    description: 'Volume Number',
    example: '1',
  })
  volume: string;

  @ApiProperty({
    description: 'Chapter Number',
    example: '1',
  })
  chapter: string;

  @ApiProperty({
    description: 'Chapter publish date',
    example: '2018-01-15T16:38:24+00:00',
  })
  publishAt: string;

  @ApiProperty({
    description: 'Chapter readable date',
    example: '2018-01-15T16:38:24+00:00',
  })
  readableAt: string;

  @ApiProperty({
    description: 'Chapter creation date',
    example: '2018-01-15T16:38:24+00:00',
  })
  createdAt: string;

  @ApiProperty({
    description: 'Chapter last update date',
    example: '2018-01-15T16:38:24+00:00',
  })
  updatedAt: string;

  @ApiProperty({
    description: 'Total Pages',
    example: 10,
  })
  pages: number;

  @ApiProperty({
    description: 'Manga ID',
    example: 'a1b2c3d4-e5f6-7890-abcd-1234567890ef',
  })
  mangaId: string;

  @ApiProperty({
    description: 'Chapter ID',
    example: 'a1b2c3d4-e5f6-7890-abcd-1234567890ef',
  })
  id: string;

  @ApiProperty({ description: 'Title of the chapter', example: 'Chapter 1' })
  title: string;

  @ApiProperty({ description: 'Manga Details', type: MangaItemDto })
  manga?: MangaItemDto;


  @ApiProperty({
    description: 'Scanlator name',
    example: 'scanlator',
  })
  scanlator?: string;
}

export class LatestUpdatedChaptersResponseDto extends BaseListMetaOutputDto {
  @ApiProperty({
    type: LatestUpdatedChapterDto,
    description: 'List of manga data items',
    isArray: true,
  })
  data: LatestUpdatedChapterDto[];
}
