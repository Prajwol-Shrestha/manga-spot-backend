import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { MangaService } from './manga.service';
import { GetMangaQueryDto } from './dtos/get-manga-query.dto';
import { ThrottlerGuard } from '@nestjs/throttler';

@UseGuards(ThrottlerGuard)
@Controller('manga')
export class MangaController {
  constructor(private readonly mangaService: MangaService) {}

  @Get()
  async getAllManga(@Query() query: GetMangaQueryDto) {
    const result = await this.mangaService.getManga(query);
    return result;
  }

  @Get('random')
  async getRandomManga() {
    const result = await this.mangaService.getRandomManga();
    return result;
  }

  @Get('tags')
  async getTags() {
    const result = await this.mangaService.getAllTags();
    return result;
  }

  @Get(':id')
  async getMangaById(@Param('id') id: string) {
    const result = await this.mangaService.getManagaById(id);
    return result;
  }

  //   @Get(':id')
  //   getMangaChapters() {
  //     return 'Manga Chapters';
  //   }

  //   @Get(':id')
  //   getMangaFeed() {
  //     return 'Manga manga feed';
  //   }
}
