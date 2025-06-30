import { ApiProperty } from '@nestjs/swagger';

export class TagOutputDto {
  @ApiProperty({ description: 'Unique identifier for the tag', example: '391b0423-d847-456f-aff0-8b0cfc03066b' })
  id: string;

  @ApiProperty({ description: 'The type of the object, typically "tag"', example: 'tag' })
  type: string;

  @ApiProperty({ description: 'The group this tag belongs to, e.g., genre, format, theme', example: 'genre' })
  group: string;

  @ApiProperty({ description: 'Tag name (usually in English)', example: 'Action' })
  name: string;

  @ApiProperty({ description: 'Optional description of the tag', example: 'High-paced and full of excitement', required: false })
  description?: string;
}
