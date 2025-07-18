import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    example: 10,
    description: 'Number of items returned in this page',
  })
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  limit: number;

  @ApiProperty({ example: 0, description: 'Pagination offset' })
  @IsOptional()
  @Type(() => Number)
  @Min(0)
  offset: number;
}
