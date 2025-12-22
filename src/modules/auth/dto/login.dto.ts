import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @ApiProperty({ description: 'Login' })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({ description: 'Senha' })
    @IsString()
    @IsNotEmpty()
    password: string;
}