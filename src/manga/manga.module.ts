import { Module } from '@nestjs/common';
import { MangaController } from './manga.controller';
import { MangaService } from './manga.service';
import { HttpModule } from 'src/common/http/http.module';

@Module({
  imports: [HttpModule],
  controllers: [MangaController],
  providers: [MangaService]
})
export class MangaModule {}
