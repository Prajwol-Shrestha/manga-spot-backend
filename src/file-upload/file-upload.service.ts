import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class FileUploadService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getSignedUrl(bucketName: string, fileName: string) {
    const supabase = this.supabaseService.getClient();

    const { data, error } = await supabase.storage
      .from(bucketName)
      .createSignedUploadUrl(fileName, {
        upsert: true,
      });
   if (error) {
      throw new Error(`Failed to create signed upload URL: ${error.message}`);
    }
    return data;
  }
}
