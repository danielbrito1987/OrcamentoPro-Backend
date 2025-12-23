import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @ApiProperty({ description: 'E-mail' })
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ description: 'Senha' })
    @IsString()
    @IsNotEmpty()
    password: string;
}