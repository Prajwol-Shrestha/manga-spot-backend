import { Controller, Get, Query, Res } from '@nestjs/common';
import axios from 'axios';
import { Response } from 'express';

@Controller('image-proxy')
export class ImageController {
  @Get()
  async proxyImage(@Query('url') url: string, @Res() res: Response) {
    if (!url || !url.startsWith('https://mangadex.org/covers/')) {
      return res.status(400).send('Invalid image URL');
    }

    try {
      const response = await axios.get(url, {
        responseType: 'stream',
        headers: {
          'Accept': 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
          'User-Agent': 'MangaSpotBackend/1.0',
        },
      });

      res.setHeader('Content-Type', response.headers['content-type'] || 'image/jpeg');
      res.setHeader('Cache-Control', 'public, max-age=86400');

      response.data.pipe(res);
    } catch (err) {
      console.error('Image proxy error:', err.message);
      return res.status(500).send('Failed to proxy image');
    }
  }
}
