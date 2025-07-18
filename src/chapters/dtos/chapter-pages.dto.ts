import { ApiProperty } from '@nestjs/swagger';
import { MangaItemWithVolumesDto } from 'src/manga/dtos/manga-output.dto';

export class ChapterPagesDto {
  result: string;
  baseUrl: string;
  chapter: {
    hash: string;
    data: string[];
    dataSaver: string[];
  };
}

class ChapterDataDto {
  @ApiProperty({
    type: [String],
    description: 'List of chapter image URLs',
  })
  chapterImages: string[];

  @ApiProperty({
    type: MangaItemWithVolumesDto,
    description: 'Manga details for the chapter',
  })
  mangaDetails: MangaItemWithVolumesDto;
}

export class ChapterPagesOutputDto {
  @ApiProperty({ example: 'ok', description: 'API result status' })
  result: string;

  @ApiProperty({ example: '10', description: 'Count of chapter pages' })
  count: number;
    
  @ApiProperty({
    description: 'Chapter data with manga details',
    type: ChapterDataDto
  })
  data: {
    chapterImages: string[];
    mangaDetails: MangaItemWithVolumesDto;
  };
}
