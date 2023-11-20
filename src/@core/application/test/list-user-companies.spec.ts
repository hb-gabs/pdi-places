import { UserMemoryRespository } from '../../../@core/infra/db/in-memory/user-memory.repository';
import { ListUserCompanies } from '../company/list-user-companies';
import { CompanyMemoryRepository } from '../../../@core/infra/db/in-memory/company-memory.repository';
import { User } from '../../../@core/domain/user/user';
import { Company } from '../../../@core/domain/company/company';

describe('List user companies', () => {
  test('execute', async () => {
    const userRepo = new UserMemoryRespository();
    const companyRepo = new CompanyMemoryRepository();
    const listUserCompanies = new ListUserCompanies(companyRepo, userRepo);

    const user = new User({
      email: 'test@email.com',
      name: 'Test',
      password: 'pass123',
    });

    const userId = user.id;

    userRepo.save(user);

    const company = new Company({
      cnpj: 123456,
      name: 'Company 01',
      website: 'company.com',
      owner_id: userId,
    });

    companyRepo.save(company);

    const userCompanies = await listUserCompanies.execute(userId);

    expect(userCompanies).toStrictEqual([company]);
  });
});
