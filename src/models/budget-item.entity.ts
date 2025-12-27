import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Budget } from "./budget.entity";
import { Product } from "./product.entity";

@Entity('budget_items')
export class BudgetItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    budgetId: string;

    @ManyToOne(() => Budget, budget => budget.items, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'budgetId' })
    budget: Budget;

    @Column()
    productId: string;

    @Column()
    quantity: number;

    @Column('decimal', {
        precision: 10,
        scale: 2,
        transformer: {
            to: (value: number) => value,
            from: (value: string) => Number(value)
        }
    })
    price: number;

    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'datetime' })
    updated_at: Date;

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'productId' })
    product: Product;
}
