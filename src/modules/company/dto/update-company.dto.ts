import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateCompanyDto {
    @ApiProperty({ description: 'Nome da empresa' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'CPF/CNPJ' })
    @IsString()
    @IsNotEmpty()
    document: string;

    @ApiProperty({ description: 'Telefone' })
    @IsString()
    @IsNotEmpty()
    phone: string;

    @ApiProperty({ description: 'E-mail' })
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ description: 'Logomarca' })
    @IsString()
    logo: string;

    @ApiProperty({ description: 'Senha' })
    @IsString()
    @IsNotEmpty()
    password: string;
}