import { CompanyRepository } from '../../../domain/company/company.repository';
import { Company } from '../../../domain/company/company';
import { Exception } from '../../../application/utils/app-exception';
import { IQueryOptions } from 'src/@core/application/utils/interfaces';

export class CompanyMemoryRepository implements CompanyRepository {
  companies: Company[] = [];

  async save(input: Company): Promise<void> {
    if (input.id) {
      const company = this.companies.find((c) => c.id === input.id);
      if (company) {
        this.companies = this.companies.map((c) =>
          c.id === input.id ? input : c,
        );
        return;
      }
    }
    this.companies.push(input);
    return;
  }

  async findAllByOwnerId(
    ownerId: string,
    options: IQueryOptions,
  ): Promise<[Company[], number]> {
    const foundCompanies = this.companies.filter((c) => c.owner.id === ownerId);
    return [foundCompanies, foundCompanies.length];
  }

  async findById(id: string): Promise<Company> {
    const company = this.companies.find((c) => c.id === id);
    if (!company) {
      throw new Exception('Company not found!', 400);
    }
    return company;
  }
}
