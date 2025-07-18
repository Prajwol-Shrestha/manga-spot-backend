import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateBookMarkDto{
    @ApiProperty({
        description: 'Manga ID',
        example: 'a1b2c3d4-e5f6-7890-abcd-1234567890ef',
        required: true
    })
    @IsString()
    mangaId: string
    
    @ApiProperty({
        description: 
        'Manga title',
        example: 'One Piece',
        required: true
    })
    @IsString()
    title: string


    @ApiProperty({
        description: 
        'Manga cover art',
        example: 'https://example.com/cover.jpg',
        required: true
    })
    @IsString()
    coverArt: string
}