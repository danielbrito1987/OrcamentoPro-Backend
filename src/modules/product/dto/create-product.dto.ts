import { ApiProperty } from "@nestjs/swagger";
import { IsDecimal, IsNotEmpty, IsString } from "class-validator";

export class CreateProductDto {
    @ApiProperty({ description: 'ID da Empresa' })
    @IsString()
    @IsNotEmpty()
    companyId: string;

    @ApiProperty({ description: 'Tipo' })
    @IsString()
    @IsNotEmpty()
    type: 'PRODUCT' | 'SERVICE';

    @ApiProperty({ description: 'Descrição' })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ description: 'Valor' })
    @IsDecimal()
    @IsNotEmpty()
    value: number;

    @ApiProperty({ description: 'Unidade' })
    @IsString()
    @IsNotEmpty()
    unit: string;
}