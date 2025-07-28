import { Module } from '@nestjs/common';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';
import { SupabaseModule } from 'src/supabase/supabase.module';

@Module({
  controllers: [FileUploadController],
  providers: [FileUploadService],
  imports: [SupabaseModule],
})
export class FileUploadModule {}
