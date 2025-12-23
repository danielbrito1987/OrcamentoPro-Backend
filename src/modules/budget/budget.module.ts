import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Budget } from 'src/models/budget.entity';
import { BudgetService } from './budget.service';
import { BudgetController } from './budget.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Budget])],
    providers: [BudgetService],
    controllers: [BudgetController],
    exports: [BudgetService]
})
export class BudgetModule {}