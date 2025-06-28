import { SignupDto } from "src/auth/dtos/signup.dto";
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserDto extends PartialType(SignupDto){}