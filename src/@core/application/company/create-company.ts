import { User } from '../../../@core/domain/user/user';
import { Company } from '../../domain/company/company';
import { CompanyRepository } from '../../domain/company/company.repository';
import { UserRepository } from '../../domain/user/user.repository';

type TInput = {
  name: string;
  website: string;
  cnpj: number;
};

export class CreateCompany {
  constructor(
    readonly companyRepo: CompanyRepository,
    readonly userRepo: UserRepository,
  ) {}

  async execute(input: TInput, ownerId: string): Promise<void> {
    const owner = await this.userRepo.findById(ownerId);
    const company = new Company({
      name: input.name,
      cnpj: input.cnpj,
      website: input.website,
      owner: { id: owner.id } as User,
    });
    await this.companyRepo.save(company);
    return;
  }
}
