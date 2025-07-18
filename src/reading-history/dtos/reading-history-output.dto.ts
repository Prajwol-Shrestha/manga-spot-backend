import { ApiProperty } from '@nestjs/swagger';

export class ReadingHistoryOutputDto {
  @ApiProperty({
    description: 'User ID',
    example: 'a1b2c3d4-e5f6-7890-abcd-1234567890ef',
  })
  userId: string;

  @ApiProperty({
    description: 'Manga ID',
    example: 'a1b2c3d4-e5f6-7890-abcd-1234567890ef',
  })
  mangaId: string;

  @ApiProperty({
    description: 'Manga title',
    example: 'One Piece',
  })
  title: string;

  @ApiProperty({
    description: 'Manga cover art',
    example: 'https://example.com/cover.jpg',
  })
  coverArt: string;

  @ApiProperty({
    description: 'Manga chapter creation date',
    example: '2018-01-15T16:38:24+00:00',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Manga chapter last update date',
    example: '2018-01-15T16:38:24+00:00',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Manga chapter number',
    example: '1',
  })
  chapterNumber: string;

  @ApiProperty({
    description: 'Manga chapter ID',
    example: 'a1b2c3d4-e5f6-7890-abcd-1234567890ef',
  })
  chapterId: string;
}
