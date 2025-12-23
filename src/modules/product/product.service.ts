import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/models/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>
    ) { }

    async findAll(companyId: string): Promise<Product[]> {
        return await this.productRepository.find({ where: { companyId } });
    }

    async findOne(companyId: string, id: string): Promise<Product | null> {
        return this.productRepository.findOne({
            where: { id, companyId }
        });
    }

    async create(dto: CreateProductDto): Promise<Product> {
        const product: Partial<Product> = {
            companyId: dto.companyId,
            type: dto.type,
            description: dto.description,
            value: dto.value,
            unit: dto.unit
        };

        const newProduct = this.productRepository.create(product);

        return this.productRepository.save(newProduct);
    }

    async update(id: string, updateDto: UpdateProductDto): Promise<Product> {
        const product = await this.productRepository.preload({
            id: id,
            ...updateDto
        });

        if (!product) {
            throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
        }

        return this.productRepository.save(product);
    }


    async remove(id: string, companyId: string): Promise<void> {
        const company = await this.findOne(companyId, id);
        await this.productRepository.remove(company!);
    }
}