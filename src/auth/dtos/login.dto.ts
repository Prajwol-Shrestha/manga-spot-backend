import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsStrongPassword } from "class-validator";

export class LoginDto {
    @ApiProperty({
        description: 'Email of the user', required: true})
    @IsString()
    username: string;

    @ApiProperty({
        description: 'Password of the user', required: true})
    @IsStrongPassword()
    password: string;
}