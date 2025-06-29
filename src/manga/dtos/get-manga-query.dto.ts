import {
  IsOptional,
  IsString,
  IsNumberString,
  IsEnum,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';

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

export class OrderDto {
  @IsOptional()
  @IsEnum(OrderDirection)
  title?: OrderDirection;

  @IsOptional()
  @IsEnum(OrderDirection)
  year?: OrderDirection;

  @IsOptional()
  @IsEnum(OrderDirection)
  createdAt?: OrderDirection;

  @IsOptional()
  @IsEnum(OrderDirection)
  updatedAt?: OrderDirection;

  @IsOptional()
  @IsEnum(OrderDirection)
  latestUploadedChapter?: OrderDirection;

  @IsOptional()
  @IsEnum(OrderDirection)
  followedCount?: OrderDirection;

  @IsOptional()
  @IsEnum(OrderDirection)
  relevance?: OrderDirection;
}

export class GetMangaQueryDto {
  @IsOptional()
  @IsNumberString()
  page?: string;

  @IsOptional()
  @IsNumberString()
  limit?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNumberString()
  year?: string;

  @IsOptional()
  @IsArray()
  @IsEnum(MangaStatus, { each: true })
  @Type(() => String)
  status?: MangaStatus[];

  @IsOptional()
  @ValidateNested()
  @Type(() => OrderDto)
  order?: OrderDto;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  includedTags?: string[];

  @IsOptional()
  @IsString()
  includedTagsMode?: string;
}
