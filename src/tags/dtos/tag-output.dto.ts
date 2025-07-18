import {
  ApiExtraModels,
  ApiProperty,
  getSchemaPath,
} from '@nestjs/swagger';
import { BaseListMetaOutputDto } from 'src/shared/dtos/base-list-meta-output.dto';

export class TagDto {
  @ApiProperty({ description: 'Tag Id', example: '391b0423-d847-456f-aff0-8b0cfc03066b' })
  id: string;

  @ApiProperty({ description: 'Tag Name', example: 'Action' })
  name: string;

  @ApiProperty({ description: 'Tag Description', example: 'High-paced and full of excitement' })
  description: string;

  @ApiProperty({ description: 'Tag Group', example: 'genre' })
  group: string;

  @ApiProperty({ description: 'Tag Type', example: 'tag' })
  type: string;
}

@ApiExtraModels(TagDto)
export class TagOutputDto extends BaseListMetaOutputDto {
  @ApiProperty({
    description: 'Data of tags grouped by tag group (e.g., genre, theme)',
    type: 'object',
    additionalProperties: {
      type: 'array',
      items: { $ref: getSchemaPath(TagDto) },
    },
    example: {
      genre: [
        {
          id: '391b0423-d847-456f-aff0-8b0cfc03066b',
          name: 'Action',
          description: 'High-paced and full of excitement',
          group: 'genre',
          type: 'tag',
        }
      ],
      theme: [
        {
          id: '8b6fbec2-d0f5-4a3a-a833-49a2a21d3f3b',
          name: 'Revenge',
          description: 'Driven by vengeance',
          group: 'theme',
          type: 'tag',
        },
      ],
    },
  })
  data: Record<string, TagDto[]>;
}
