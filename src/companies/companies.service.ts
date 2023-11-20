import { HttpException, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { ChangeCompanyResponsibleDto } from './dto/change-company-responsible.dto';
import { ChangeCompanyResponsible } from '../@core/application/company/change-company-responsible';
import { CreateCompany } from '../@core/application/company/create-company';
import { ListUserCompanies } from '../@core/application/company/list-user-companies';

@Injectable()
export class CompaniesService {
  constructor(
    private createCompany: CreateCompany,
    private changeCompanyResponsible: ChangeCompanyResponsible,
    private listUserCompanies: ListUserCompanies,
  ) {}

  async createNewCompany(createCompanyDto: CreateCompanyDto) {
    const { cnpj, name, owner_id, website } = createCompanyDto;
    try {
      return await this.createCompany.execute(
        {
          name,
          cnpj,
          website,
        },
        owner_id,
      );
    } catch (error) {
      throw new HttpException(error.message, error.statusCode);
    }
  }

  async changeResponsible(
    id: string,
    changeCompanyResponsibleDto: ChangeCompanyResponsibleDto,
  ) {
    try {
      return await this.changeCompanyResponsible.execute(
        id,
        changeCompanyResponsibleDto.responsibleId,
      );
    } catch (error) {
      throw new HttpException(error.message, error.statusCode);
    }
  }

  async listCompaniesByOwner(userId: string) {
    try {
      return await this.listUserCompanies.execute(userId);
    } catch (error) {
      throw new HttpException(error.message, error.statusCode);
    }
  }
}
