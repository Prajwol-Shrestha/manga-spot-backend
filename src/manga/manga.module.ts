import { Module } from '@nestjs/common';
import { MangaController } from './manga.controller';
import { MangaService } from './manga.service';
import { HttpModule } from 'src/common/http/http.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    HttpModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 50,
        },
      ],
    }),
  ],
  controllers: [MangaController],
  providers: [MangaService],
})
export class MangaModule {}
