import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ReadingHistoryService } from './reading-history.service';
import { JwtAuthGuard } from 'src/auth/guards/passport-jwt.guard';

@Controller('reading-history')
export class ReadingHistoryController {
  constructor(private readonly readingHistoryService: ReadingHistoryService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getReadingHistory(@Req() req: any) {
    const userId = req.user.userId;
    return this.readingHistoryService.getReadingHistory(userId);
  }
}
