import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('product')
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    companyId: string;

    @Column({
        type: 'enum',
        enum: ['PRODUCT', 'SERVICE'],
    })
    type: 'PRODUCT' | 'SERVICE';

    @Column({ type: 'varchar', length: 150 })
    description: string;

    @Column('decimal', {
        precision: 10,
        scale: 2,
        transformer: {
            to: (value: number) => value,
            from: (value: string) => Number(value),
        },
    })
    value: number;

    @Column({ type: 'varchar', length: 10 })
    unit: string;

    @CreateDateColumn({ type: 'datetime' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'datetime' })
    updated_at: Date;
}
