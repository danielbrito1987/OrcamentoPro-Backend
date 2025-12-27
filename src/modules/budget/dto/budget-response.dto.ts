export class BudgetItemResponseDto {
    id: string;
    productId: string;
    description: string;
    unit: string;
    quantity: number;
    price: number;
}

export class BudgetResponseDto {
    id: string;
    companyId: string;
    clientName: string;
    clientPhone: string;
    clientEmail: string;
    address: string;
    city: string;
    state: string;
    notes?: string;
    items: BudgetItemResponseDto[];
    total: number;
    createdAt: Date;
}