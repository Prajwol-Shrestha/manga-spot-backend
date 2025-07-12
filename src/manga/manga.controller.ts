import {
  Controller,
  Get,
  Param,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { MangaService } from './manga.service';
import { GetMangaQueryDto } from './dtos/get-manga-query.dto';
import { ThrottlerGuard } from '@nestjs/throttler';
import { OptionalJwtAuthGuard } from 'src/auth/guards/optional-jwt.guard';

@UseGuards(ThrottlerGuard)
@Controller('manga')
export class MangaController {
  constructor(private readonly mangaService: MangaService) {}

  @Get()
  @UseGuards(OptionalJwtAuthGuard)
  async getAllManga(@Request() req: any, @Query() query?: any) {
    const userId = await req?.user?.userId;
    const result = await this.mangaService.getManga(query, userId);
    return result;
  }

  // TODO: DTO is rejecting query like includes[]=cover_art&includes[]=author
  @Get('random')
  @UseGuards(OptionalJwtAuthGuard)
  async getRandomManga(@Request() req: any, @Query() query?: any) {
    const userId = await req?.user?.userId;

    const result = await this.mangaService.getRandomManga(query, userId);
    return result;
  }

  @Get('latest-updated-chapters')
  async getChapters(@Query() query: any) {
    const result = await this.mangaService.getChapters(query);
    return result;
  }

  @Get('tags')
  async getTags() {
    const result = await this.mangaService.getAllTags();
    return result;
  }

  @Get(':id')
  @UseGuards(OptionalJwtAuthGuard)
  async getMangaById(@Request() req: any, @Param('id') id: string, @Query() query?: any) {
    const userId = await req?.user?.userId;

    const result = await this.mangaService.getManagaById(id, userId, query);
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
