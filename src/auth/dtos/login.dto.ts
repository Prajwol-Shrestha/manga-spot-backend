import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class LoginDto {
    @IsString()
    username: string;

    @IsStrongPassword()
    password: string;
}