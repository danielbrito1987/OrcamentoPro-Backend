import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BudgetItem } from "./budget-item.entity";

@Entity('budget')
export class Budget {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    companyId: string;

    @Column({ type: 'varchar', length: 150 })
    clientName: string;

    @Column({ type: 'varchar', length: 20 })
    clientPhone: string;

    @Column({ type: 'varchar', length: 150 })
    clientEmail: string;

    @Column({ type: 'varchar', length: 150 })
    address: string;

    @Column({ type: 'varchar', length: 150 })
    city: string;

    @Column({ type: 'varchar', length: 10 })
    state: string;

    @Column({ nullable: true })
    notes: string;

    @OneToMany(() => BudgetItem, item => item.budget, {
        cascade: true, // salva itens junto com o orçamento
    })
    items: BudgetItem[];

    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'datetime' })
    updated_at: Date;
}
