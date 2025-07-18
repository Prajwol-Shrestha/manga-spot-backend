import { ApiProperty } from '@nestjs/swagger';

export class BaseListMetaOutputDto {
  @ApiProperty({ example: 'ok', description: 'API result status' })
  result: string;

  @ApiProperty({
    example: 'collection',
    description: 'Type of response returned',
  })
  response: string;

  @ApiProperty({
    example: 10,
    description: 'Number of items returned in this page',
  })
  limit: number;

  @ApiProperty({ example: 0, description: 'Pagination offset' })
  offset: number;

  @ApiProperty({ example: 100, description: 'Total number of items available' })
  total: number;
}
