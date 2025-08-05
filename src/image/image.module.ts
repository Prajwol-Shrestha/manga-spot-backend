import { Module } from '@nestjs/common';
import { HttpModule } from 'src/common/http/http.module';
import { ImageController } from './image.controller';

@Module({
    // imports: [HttpModule],
    controllers: [ImageController],
})
export class ImageModule {}
