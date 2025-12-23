import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateBudgetDto {
    @ApiProperty({ description: 'ID da Empresa' })
    @IsString()
    @IsNotEmpty()
    companyId: string;

    @ApiProperty({ description: 'Nome do Cliente' })
    @IsString()
    @IsNotEmpty()
    clientName: string;

    @ApiProperty({ description: 'Telefone do Cliente' })
    @IsString()
    clientPhone: string;

    @ApiProperty({ description: 'E-mail do Cliente' })
    @IsString()
    clientEmail: string;

    @ApiProperty({ description: 'Endereço' })
    @IsString()
    address: string;

    @ApiProperty({ description: 'Cidade' })
    @IsString()
    city: string;

    @ApiProperty({ description: 'UF' })
    @IsString()
    state: string;

    @ApiProperty({ description: 'Observações' })
    @IsString()
    notes: string;
}