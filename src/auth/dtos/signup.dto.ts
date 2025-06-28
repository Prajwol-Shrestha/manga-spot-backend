import {
  IsString,
  IsEmail,
  IsStrongPassword,
  MinLength,
  Max,
  MaxLength,
  Matches,
} from 'class-validator';

export class SignupDto {
  @IsString()
  name: string;

  @IsString()
  @MinLength(6)
  @MaxLength(30)
  @Matches(/^(?!.*[_.]{2})[a-zA-Z0-9](?!.*[_.]{2})[a-zA-Z0-9._]*[a-zA-Z0-9]$/, {
    message:
      'Username must be alphanumeric and may include underscores or dots, but cannot start/end with them or have consecutive special characters',
  })
  username: string;

    @IsEmail()
    email: string;

  @IsStrongPassword()
  password: string;
}
