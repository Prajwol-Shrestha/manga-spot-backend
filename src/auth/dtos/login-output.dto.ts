import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { BaseUserDto } from 'src/user/dtos/user-output.dto';

export class LoginOutputDto extends BaseUserDto {
  @ApiProperty({ description: 'Access token', example: 'token' })
  @IsString()
  accessToken: string;
}
