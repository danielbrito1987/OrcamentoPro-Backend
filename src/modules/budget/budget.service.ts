import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Budget } from 'src/models/budget.entity';
import { Repository } from 'typeorm';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';

@Injectable()
export class BudgetService {
    constructor(
        @InjectRepository(Budget)
        private budgetRepository: Repository<Budget>
    ) { }

    async findAll(companyId: string): Promise<Budget[]> {
        return await this.budgetRepository.find({ where: { companyId } });
    }

    async findOne(companyId: string, id: string): Promise<Budget | null> {
        return this.budgetRepository.findOne({
            where: { id, companyId }
        });
    }

    async create(dto: CreateBudgetDto): Promise<Budget> {
        const budget: Partial<Budget> = {
            companyId: dto.companyId,
            clientName: dto.clientName,
            clientPhone: dto.clientPhone,
            clientEmail: dto.clientEmail,
            address: dto.address,
            city: dto.city,
            state: dto.state,
            notes: dto.notes
        };

        const newBudget = this.budgetRepository.create(budget);

        return this.budgetRepository.save(newBudget);
    }

    async update(id: string, dto: UpdateBudgetDto): Promise<Budget> {
        const budget = await this.budgetRepository.preload({
            id: id,
            ...dto
        });

        if (!budget) {
            throw new NotFoundException(`Orçamento com ID ${id} não encontrado.`);
        }

        return this.budgetRepository.save(budget);
    }

    async remove(id: string, companyId: string): Promise<void> {
        const budget = await this.findOne(companyId, id);
        await this.budgetRepository.remove(budget!);
    }
}