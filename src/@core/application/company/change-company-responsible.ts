import { CompanyRepository } from '../../domain/company/company.repository';
import { UserRepository } from '../../domain/user/user.repository';

export class ChangeCompanyResponsible {
  constructor(
    readonly companyRepo: CompanyRepository,
    readonly userRepo: UserRepository,
  ) {}

  async execute(companyId: string, userId: string): Promise<void> {
    const company = await this.companyRepo.findById(companyId);
    const user = await this.userRepo.findById(userId);

    company.props.owner_id = user.id;

    await this.companyRepo.save(company);

    return;
  }
}
