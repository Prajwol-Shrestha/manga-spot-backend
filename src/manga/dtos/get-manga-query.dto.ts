import {
  IsOptional,
  IsString,
  IsNumberString,
  IsEnum,
  IsArray,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export enum OrderDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export enum MangaStatus {
  ONGOING = 'ongoing',
  COMPLETED = 'completed',
  HIATUS = 'hiatus',
  CANCELLED = 'cancelled',
}

export enum Includes {
  MANGA = 'manga',
  COVER_ART = 'cover_art',
  AUTHOR = 'author',
  ARTIST = 'artist',
  TAG = 'tag',
  CREATOR = 'creator',
}

export class OrderDto {
  @ApiProperty({ enum: OrderDirection, required: false })
  @IsOptional()
  @IsEnum(OrderDirection)
  title?: OrderDirection;

  @ApiProperty({ enum: OrderDirection, required: false })
  @IsOptional()
  @IsEnum(OrderDirection)
  year?: OrderDirection;

  @ApiProperty({ enum: OrderDirection, required: false })
  @IsOptional()
  @IsEnum(OrderDirection)
  createdAt?: OrderDirection;

  @ApiProperty({ enum: OrderDirection, required: false })
  @IsOptional()
  @IsEnum(OrderDirection)
  updatedAt?: OrderDirection;

  @ApiProperty({ enum: OrderDirection, required: false })
  @IsOptional()
  @IsEnum(OrderDirection)
  latestUploadedChapter?: OrderDirection;

  @ApiProperty({ enum: OrderDirection, required: false })
  @IsOptional()
  @IsEnum(OrderDirection)
  followedCount?: OrderDirection;

  @ApiProperty({ enum: OrderDirection, required: false })
  @IsOptional()
  @IsEnum(OrderDirection)
  relevance?: OrderDirection;
}

export class GetMangaQueryDto {
  @ApiProperty({
    description: 'Number of items returned in this page',
    required: false,
    example: '10',
  })
  @IsOptional()
  @IsNumberString()
  limit?: string;

  @ApiProperty({ description: 'Manga title', required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ description: 'Manga year', required: false, example: '2024' })
  @IsOptional()
  @IsNumberString()
  year?: string;

  @ApiProperty({
    description: 'Manga status',
    enum: MangaStatus,
    isArray: true,
    required: false,
  })
  @IsOptional()
  @IsArray()
  @IsEnum(MangaStatus, { each: true })
  @Type(() => String)
  @Transform(({ value }) =>
    typeof value === 'string' ? value.split(',') : value,
  )
  status?: MangaStatus[];

  @ApiProperty({
    description: 'Manga order',
    required: false,
    type: () => OrderDto,
  })
  @IsOptional()
  @Type(() => OrderDto)
  order?: OrderDto;

  // property order[followedCount] should not exist,property contentRating should not exist,property hasAvailableChapters should not exist,property createdAtSince should not exist
 @ApiProperty({ description: 'Content rating filter', required: false, isArray: true, example: ['safe', 'suggestive'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  contentRating?: string[];

  @ApiProperty({ description: 'Has available chapters', required: false })
  @IsOptional()
  hasAvailableChapters?: boolean;

  @ApiProperty({ description: 'Created at since date', required: false, example: '2024-03-20T00:00:00' })
  @IsOptional()
  @IsString()
  createdAtSince?: string;

  @ApiProperty({
    description: 'Manga tags',
    required: false,
    isArray: true,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  includedTags?: string[];

  @ApiProperty({
    description: 'Manga tags mode',
    required: false,
    example: 'AND',
  })
  @IsOptional()
  @IsString()
  includedTagsMode?: string;

  @ApiProperty({
    description: 'Manga includes',
    required: false,
    enum: Includes,
    isArray: true,
  })
  @IsOptional()
  @IsArray()
  @IsEnum(Includes, { each: true })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.split(',') : value,
  )
  includes?: Includes[];
}
