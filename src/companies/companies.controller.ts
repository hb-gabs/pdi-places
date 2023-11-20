import { Controller, Post, Body, Patch, Param, Get } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { ChangeCompanyResponsibleDto } from './dto/change-company-responsible.dto';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  createCompany(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.createNewCompany(createCompanyDto);
  }

  @Patch(':id')
  changeResponsible(
    @Param('id') id: string,
    @Body() changeCompanyResponsibleDto: ChangeCompanyResponsibleDto,
  ) {
    return this.companiesService.changeResponsible(
      id,
      changeCompanyResponsibleDto,
    );
  }

  @Get('/user/:userid')
  listCompaniesByOwner(@Param('userid') userId: string) {
    return this.companiesService.listCompaniesByOwner(userId);
  }
}
