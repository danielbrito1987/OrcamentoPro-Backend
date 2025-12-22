import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { CompanyService } from './company.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('companies')
export class CompanyController {
    constructor(private companyService: CompanyService) { }

    @Post()
    @ApiBearerAuth('token')
    @UseGuards(JwtAuthGuard)
    create(@Body() companyData: CreateCompanyDto) {
        return this.companyService.create(companyData);
    }

    @Get(':email')
    findOne(@Param('rmail') email: string) {
        return this.companyService.findOne(email);
    }

    @Put(':id')
    @ApiBearerAuth('token')
    @UseGuards(JwtAuthGuard)
    update(@Param('id') id: string, @Body() userData: UpdateCompanyDto) {
        return this.companyService.update(id, userData);
    }

    @Delete(':id')
    @ApiBearerAuth('token')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id: string) {
        return this.companyService.remove(id);
    }
}