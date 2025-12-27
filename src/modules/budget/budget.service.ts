import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Budget } from 'src/models/budget.entity';
import { Repository } from 'typeorm';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { BudgetItem } from 'src/models/budget-item.entity';
import { BudgetResponseDto } from './dto/budget-response.dto';

@Injectable()
export class BudgetService {
    constructor(
        @InjectRepository(Budget)
        private budgetRepository: Repository<Budget>
    ) { }

    async findAll(companyId: string): Promise<BudgetResponseDto[]> {
        const budgets = await this.budgetRepository.find({
            where: { companyId },
            relations: ['items', 'items.product'],
            order: { createdAt: 'DESC' }
        });

        return budgets.map(budget => this.toResponse(budget));
    }

    async findOne(companyId: string, id: string): Promise<BudgetResponseDto> {
        const budget = await this.budgetRepository.findOne({
            where: { id, companyId },
            relations: ['items', 'items.product']
        });

        if (!budget) {
            throw new NotFoundException('Orçamento não encontrado!');
        }

        return this.toResponse(budget);
    }

    async create(dto: CreateBudgetDto): Promise<BudgetResponseDto> {
        const budget: Partial<Budget> = {
            companyId: dto.companyId,
            clientName: dto.clientName,
            clientPhone: dto.clientPhone,
            clientEmail: dto.clientEmail,
            address: dto.address,
            city: dto.city,
            state: dto.state,
            notes: dto.notes,
        };

        const newBudget = this.budgetRepository.create(budget);

        newBudget.items = dto.items.map(itemDto => {
            const item = new BudgetItem();
            item.productId = itemDto.productId;
            item.quantity = itemDto.quantity;
            item.price = itemDto.price;
            item.budget = newBudget;

            return item;
        })

        try {
            const saved = await this.budgetRepository.save(newBudget);
            return this.toResponse(saved);
        }
        catch (error) {
            console.error('ERRO AO SALVAR BUDGET: ', error);
            throw error;
        }
    }

    async update(id: string, dto: UpdateBudgetDto): Promise<BudgetResponseDto> {
        const budget = await this.budgetRepository.preload({
            id: id,
            ...dto
        });

        if (!budget) {
            throw new NotFoundException(`Orçamento com ID ${id} não encontrado.`);
        }

        const saved = await this.budgetRepository.save(budget);

        return this.toResponse(saved);
    }

    async remove(id: string, companyId: string): Promise<void> {
        const budget = await this.budgetRepository.findOne({
            where: { id, companyId }
        });

        if (!budget) {
            throw new NotFoundException('Orçamento não encontrado!');
        }

        await this.budgetRepository.remove(budget!);
    }

    private calculateTotal(items: BudgetItem[]): number {
        return items.reduce(
            (sum, item) => sum + (item.quantity * Number(item.price)),
            0,
        );
    }

    private toResponse(budget: Budget): BudgetResponseDto {
        return {
            id: budget.id,
            companyId: budget.companyId,
            clientName: budget.clientName,
            clientPhone: budget.clientPhone,
            clientEmail: budget.clientEmail,
            address: budget.address,
            city: budget.city,
            state: budget.state,
            notes: budget.notes,
            createdAt: budget.createdAt,
            items: budget.items.map(item => ({
                id: item.id,
                productId: item.productId,
                description: item.product?.description ?? '',
                unit: item.product?.unit ?? '',
                quantity: item.quantity,
                price: item.price,
            })) ?? [],
            total: this.calculateTotal(budget.items ?? []),
        };
    }
}