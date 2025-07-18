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
import { AuthenticatedRequestJWT } from 'src/types/shared';
import { MangaItemWithVolumesDto, MangaOutputDto } from './dtos/manga-output.dto';

@UseGuards(ThrottlerGuard)
@Controller('manga')
export class MangaController {
  constructor(private readonly mangaService: MangaService) {}

  @Get()
  @UseGuards(OptionalJwtAuthGuard)
  async getAllManga(@Request() req: AuthenticatedRequestJWT, @Query() query?: any): Promise<MangaOutputDto> {
    const userId = req?.user?.userId;
    const result = await this.mangaService.getManga(query, userId);
    return result;
  }

  // TODO: DTO is rejecting query like includes[]=cover_art&includes[]=author
  @Get('random')
  @UseGuards(OptionalJwtAuthGuard)
  async getRandomManga(@Request() req: AuthenticatedRequestJWT, @Query() query?: any): Promise<MangaItemWithVolumesDto> {
    const userId = req?.user?.userId;
    const result = await this.mangaService.getRandomManga(query, userId);
    return result;
}

  @Get(':id')
  @UseGuards(OptionalJwtAuthGuard)
  async getMangaById(@Request() req: AuthenticatedRequestJWT, @Param('id') id: string, @Query() query?: any): Promise<MangaItemWithVolumesDto> {
    const userId =  req?.user?.userId;
    const result = await this.mangaService.getMangaById(id, userId, query);
    return result;
  }
}
