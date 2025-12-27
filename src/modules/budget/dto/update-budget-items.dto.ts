import { ApiProperty } from "@nestjs/swagger";
import { IsDecimal, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UpdateBudgetItemsDto {
    @ApiProperty({ description: 'ID do Orçamento' })
    @IsString()
    @IsNotEmpty()
    budgetId: string;

    @ApiProperty({ description: 'ID do Produto' })
    @IsString()
    @IsNotEmpty()
    productId: string;

    @ApiProperty({ description: 'Quantidade' })
    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @ApiProperty({ description: 'Valor' })
    @IsDecimal()
    @IsNotEmpty()
    price: number;
}