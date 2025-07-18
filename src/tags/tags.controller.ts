import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagOutputDto } from './dtos/tag-output.dto';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'Get all tags',
    type: TagOutputDto,
    isArray: false,
  })
  @Get()
  getTags(): Promise<TagOutputDto> {
    return this.tagsService.getAllTags();
  }
}
