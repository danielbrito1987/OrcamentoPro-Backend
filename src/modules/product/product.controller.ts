import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
@ApiBearerAuth('token')
@UseGuards(JwtAuthGuard)
export class ProductController {
    constructor(private productService: ProductService) { }

    @Post()
    create(@Body() companyData: CreateProductDto) {
        return this.productService.create(companyData);
    }

    @Get(':companyId/:id')
    findOne(@Param('companyId') companyId: string, @Param('id') id: string) {
        return this.productService.findOne(companyId, id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() userData: UpdateProductDto) {
        return this.productService.update(id, userData);
    }

    @Delete(':companyId/:id')
    remove(@Param('companyId') companyId: string, @Param('id') id: string) {
        return this.productService.remove(companyId, id);
    }
}