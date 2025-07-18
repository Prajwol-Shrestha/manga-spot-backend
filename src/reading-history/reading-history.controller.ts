import { Controller, Get, HttpCode, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { ReadingHistoryService } from './reading-history.service';
import { JwtAuthGuard } from 'src/auth/guards/passport-jwt.guard';
import { ReadingHistoryOutputDto } from './dtos/reading-history-output.dto';
import { AuthenticatedRequestJWT } from 'src/types/shared';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('reading-history')
export class ReadingHistoryController {
  constructor(private readonly readingHistoryService: ReadingHistoryService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'List of chapters pages and manga details',
    type: ReadingHistoryOutputDto,
    isArray: true,
  })
  @Get()
  @UseGuards(JwtAuthGuard)
  async getReadingHistory(@Req() req: AuthenticatedRequestJWT): Promise<ReadingHistoryOutputDto[]> {
    const userId = req.user.userId;
    return this.readingHistoryService.getReadingHistory(userId);
  }
}
