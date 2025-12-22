import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/models/company.entity';
import { Repository } from 'typeorm';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CreateCompanyDto } from './dto/create-company.dto';

@Injectable()
export class CompanyService {
    constructor(
        @InjectRepository(Company)
        private companyRepository: Repository<Company>,
    ) { }

    async findAll(): Promise<Company[]> {
        return this.companyRepository.find();
    }

    async findOne(email: string): Promise<Company | null> {
        return this.companyRepository.findOne({ 
            where: { email }
        });
    }

    async findById(id: string): Promise<Company> {
        const company = await this.companyRepository.findOne({ where: { id } });

        if (!company) {
            throw new NotFoundException(`Empresa com ID ${id} não encontrado.`);
        }

        return company;
    }

    async create(dto: CreateCompanyDto): Promise<Company> {
        const company: Partial<Company> = {
            name: dto.name,
            password: dto.password,
            phone: dto.phone,
            email: dto.email,
            document: dto.document
        };

        const newCompany = this.companyRepository.create(company);
        return this.companyRepository.save(newCompany);
    }

    async update(id: string, updateCompanyDto: UpdateCompanyDto): Promise<Company> {
        const company = await this.companyRepository.preload({
            id: id,
            ...updateCompanyDto
        })

        if (!company) {
            throw new NotFoundException(`Empresa com ID ${id} não encontrado.`);
        }

        return this.companyRepository.save(company);
    }

    async remove(id: string): Promise<void> {
        const company = await this.findById(id);
        await this.companyRepository.remove(company);
    }

    // Implementar findAll, update, remove...
}