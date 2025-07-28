import { ApiProperty } from "@nestjs/swagger";

export class FileUploadOutputDto {

    @ApiProperty({ description: 'The signed url of the file' })
    signedUrl: string;

    @ApiProperty({ description: 'The path of the file' })
    path: string;

    @ApiProperty({ description: 'The token of the file' })
    token: string
}