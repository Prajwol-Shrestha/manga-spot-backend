import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { MangaModule } from './manga/manga.module';
import { BookmarksModule } from './bookmarks/bookmarks.module';
import { ChapterPagesModule } from './chapter-pages/chapter-pages.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UserModule,
    PrismaModule,
    MangaModule,
    BookmarksModule,
    ChapterPagesModule,
    TagsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
