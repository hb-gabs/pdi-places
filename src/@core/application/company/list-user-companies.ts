import { CompanyRepository } from '../../../@core/domain/company/company.repository';
import { UserRepository } from '../../../@core/domain/user/user.repository';
import { Exception } from '../utils/app-exception';
import { Company } from '../../../@core/domain/company/company';

export class ListUserCompanies {
  constructor(
    private companyRepo: CompanyRepository,
    private userRepo: UserRepository,
  ) {}

  async execute(userId: string): Promise<Company[]> {
    const user = await this.userRepo.findById(userId);

    if (!user) {
      throw new Exception('User not found!', 400);
    }

    return await this.companyRepo.findAllByOwnerId(userId);
  }
}
