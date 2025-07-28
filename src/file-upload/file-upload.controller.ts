import { Controller, Get, HttpCode, HttpStatus, Query, UseGuards } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { JwtAuthGuard } from 'src/auth/guards/passport-jwt.guard';
import { ApiOkResponse } from '@nestjs/swagger';
import { FileUploadOutputDto } from './dtos/file-upload.dto';

@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: FileUploadOutputDto })
  @Get('signed-upload-url')
  @UseGuards(JwtAuthGuard)
  async getSignedUrl(
    @Query('bucketName') bucketName: string,
    @Query('fileName') fileName: string,
  ) {
    return await this.fileUploadService.getSignedUrl(bucketName, fileName);
  }
}
