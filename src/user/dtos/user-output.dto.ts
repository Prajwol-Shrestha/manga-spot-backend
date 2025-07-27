import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class BaseUserDto {
  @ApiProperty({
    description: 'User ID',
    example: 'a1b2c3d4-e5f6-7890-abcd-1234567890ef',
  })
  @IsString()
  id: string;

  @ApiProperty({
    description: 'Username',
    example: 'username',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'Name',
    example: 'name',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Email',
    example: 'email',
  })
  @IsString()
  email: string;

  @ApiProperty({
    description: 'Avatar',
    example: 'avatar',
  })
  @IsString()
  @IsOptional()
  avatar?: string;

  @ApiProperty({
    description: 'User Created At',
    example: '2022-01-01T00:00:00Z',
  })
  @IsString()
  createdAt: Date;

  @ApiProperty({
    description: 'User Updated At',
    example: '2022-01-01T00:00:00Z',
  })
  @IsString()
  updatedAt: Date;
}

export class UserWithPasswordDto extends BaseUserDto {
  @ApiProperty({
    description: 'Password',
    example: 'password',
  })
  @IsString()
  password: string;
}
