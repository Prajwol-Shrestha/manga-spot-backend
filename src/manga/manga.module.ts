import { Module } from '@nestjs/common';
import { MangaController } from './manga.controller';
import { MangaService } from './manga.service';
import { HttpModule } from 'src/common/http/http.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { BookmarksModule } from 'src/bookmarks/bookmarks.module';

@Module({
  imports: [
    BookmarksModule,
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
