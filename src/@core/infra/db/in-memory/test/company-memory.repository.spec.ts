import { User } from '../../../../domain/user/user';
import { Company } from '../../../../domain/company/company';
import { CompanyMemoryRepository } from '../company-memory.repository';

describe('Company Memory Repository', () => {
  const companyRepo = new CompanyMemoryRepository();
  let ownerId: string;

  test('insert company', async () => {
    const user = new User({
      name: 'user',
      email: 'user@email.com',
      password: 'pass',
    });
    const company = new Company({
      name: 'company',
      cnpj: 34654632,
      website: 'site.com.br',
      owner_id: user.id,
    });

    ownerId = user.id;

    await companyRepo.save(company);

    expect(companyRepo.companies).toHaveLength(1);
    expect(companyRepo.companies).toStrictEqual([company]);
  });

  test('get all companies', async () => {
    const companies = await companyRepo.findAllByOwnerId(ownerId, {});

    expect(companyRepo.companies).toStrictEqual(companies[0]);
  });
});
