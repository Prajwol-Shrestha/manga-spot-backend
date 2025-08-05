import { Module } from '@nestjs/common';
import { AxiosHttpService } from './axios-http.service';

@Module({
  providers: [AxiosHttpService],
  exports: [AxiosHttpService],
})
export class HttpModule {}
