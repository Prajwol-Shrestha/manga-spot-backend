import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsStrongPassword,
  MinLength,
  Max,
  MaxLength,
  Matches,
  IsOptional,
} from 'class-validator';

export class SignupDto {
  @ApiProperty({description: 'Name of the user', required: true, example: 'John Doe'})
  @IsString()
  name: string;

  @ApiProperty({description: 'Username of the user', required: true, example: 'johndoe'})
  @IsString()
  @MinLength(6)
  @MaxLength(30)
  @Matches(/^(?!.*[_.]{2})[a-zA-Z0-9](?!.*[_.]{2})[a-zA-Z0-9._]*[a-zA-Z0-9]$/, {
    message:
      'Username must be alphanumeric and may include underscores or dots, but cannot start/end with them or have consecutive special characters',
  })
  username: string;

  @ApiProperty({description: 'Email of the user', required: true, example: 'tWbB6@example.com'})
  @IsEmail()
  email: string;

  @ApiProperty({description: 'Password of the user', required: true, example: 'Password123'})
  @IsStrongPassword()
  password: string;

  @ApiProperty({description: 'Avatar URL of the user', required: false, example: 'https://example.com/avatar.jpg'})
  @IsString()
  @IsOptional()
  avatarUrl: string;
}
