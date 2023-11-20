import { Company } from '../../domain/company/company';
import { User } from '../../domain/user/user';
import { CompanyMemoryRepository } from '../../infra/db/in-memory/company-memory.repository';
import { UserMemoryRespository } from '../../infra/db/in-memory/user-memory.repository';
import { ChangeCompanyResponsible } from '../company/change-company-responsible';
import { Exception } from '../utils/app-exception';

describe('Change Compan Responsible', () => {
  const companyRepo = new CompanyMemoryRepository();
  const userRepo = new UserMemoryRespository();
  const changeResponsible = new ChangeCompanyResponsible(companyRepo, userRepo);

  const oldResponsible = new User(
    {
      name: 'old',
      email: 'olduser.com',
      password: 'pass',
    },
    'old',
  );
  const company = new Company(
    {
      name: 'nm',
      cnpj: 5432423,
      website: 'site.com',
      owner_id: oldResponsible.id,
    },
    '123',
  );
  const newResponsible = new User(
    {
      name: 'new',
      email: 'newuser.com',
      password: 'pass',
    },
    'new',
  );

  test('execution', async () => {
    await userRepo.save(oldResponsible);
    await userRepo.save(newResponsible);
    await companyRepo.save(company);
    await changeResponsible.execute(company.id, newResponsible.id);

    const companyNewResponsible = await companyRepo.findById('123');

    expect(companyNewResponsible.owner_id).toBe(newResponsible.id);
  });

  it('should throw company not found', async () => {
    await expect(
      async () =>
        await changeResponsible.execute('wrong-id', newResponsible.id),
    ).rejects.toThrow(new Exception('Company not found!', 401));
  });

  it('should throw user not found', async () => {
    await expect(
      async () => await changeResponsible.execute(company.id, 'wrong-id'),
    ).rejects.toThrow(new Error('User not found!'));
  });
});
