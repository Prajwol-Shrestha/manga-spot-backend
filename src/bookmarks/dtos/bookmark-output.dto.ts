import { ApiProperty } from '@nestjs/swagger';
import { BaseListMetaOutputDto } from 'src/shared/dtos/base-list-meta-output.dto';

export class BookmarkDto {
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
    description: 'Manga creation date',
    example: '2020-01-01T00:00:00Z',
  })
  createdAt: Date;
}


export class BookmarkOutputDto{

    @ApiProperty({ example: 100, description: 'total number of bookmarks' })
    total: number;

    @ApiProperty({ example: 10, description: 'Number of items returned in this page' })
    limit: number;

    @ApiProperty({ example: 0, description: 'Pagination offset' })
    offset: number;

    @ApiProperty({ description: 'List of bookmarks', type: [BookmarkDto] })
    data: BookmarkDto[]

}