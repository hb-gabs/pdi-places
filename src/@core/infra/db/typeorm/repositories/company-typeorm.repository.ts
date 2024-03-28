import { IQueryOptions } from '../../../../../@core/application/utils/interfaces';
import { Company } from '../../../../domain/company/company';
import { CompanyRepository } from '../../../../domain/company/company.repository';
import { Repository } from 'typeorm';

export class CompanyTypeOrmRepository implements CompanyRepository {
  constructor(private ormRepo: Repository<Company>) {}

  async findAllByOwnerId(
    ownerId: string,
    options: IQueryOptions,
  ): Promise<[Company[], number]> {
    return await this.ormRepo.findAndCount({
      where: {
        owner: { id: ownerId },
      },
      skip: options?.page * options?.pageSize,
      take: options?.pageSize,
    });
  }

  async findById(id: string): Promise<Company> {
    return await this.ormRepo.findOne({
      where: { id },
    });
  }

  async save(input: Company): Promise<void> {
    await this.ormRepo.save(input);
  }
}
