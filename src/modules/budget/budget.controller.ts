import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { BudgetService } from './budget.service';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { CreateBudgetDto } from './dto/create-budget.dto';

@Controller('budgets')
@ApiBearerAuth('token')
@UseGuards(JwtAuthGuard)
export class BudgetController {
    constructor(private budgetService: BudgetService) { }

    @Post()
    create(@Body() budgetData: CreateBudgetDto) {
        return this.budgetService.create(budgetData);
    }

    @Get(':companyId')
    findAll(@Param('companyId') companyId: string) {
        return this.budgetService.findAll(companyId);
    }

    @Get(':companyId/:id')
    findOne(@Param('companyId') companyId: string, @Param('id') id: string) {
        return this.budgetService.findOne(companyId, id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() budgetData: UpdateBudgetDto) {
        return this.budgetService.update(id, budgetData);
    }

    @Delete(':companyId/:id')
    remove(@Param('companyId') companyId: string, @Param('id') id: string) {
        return this.budgetService.remove(companyId, id);
    }
}