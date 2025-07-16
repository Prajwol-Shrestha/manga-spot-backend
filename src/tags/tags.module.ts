import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { HttpModule } from 'src/common/http/http.module';

@Module({
  controllers: [TagsController],
  providers: [TagsService],
  imports: [HttpModule]
})
export class TagsModule {}
