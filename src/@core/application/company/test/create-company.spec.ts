import { User } from '../../../domain/user/user';
import { CompanyMemoryRepository } from '../../../infra/db/in-memory/company-memory.repository';
import { UserMemoryRespository } from '../../../infra/db/in-memory/user-memory.repository';
import { CreateCompany } from '../create-company';

describe('Create Company', () => {
  const companyRepo = new CompanyMemoryRepository();
  const userRepo = new UserMemoryRespository();
  const createCompany = new CreateCompany(companyRepo, userRepo);

  test('execution', async () => {
    const owner = new User({
      name: 'name',
      password: 'pass',
      email: 'email',
    });
    await userRepo.save(owner);

    await createCompany.execute(
      {
        name: 'compan',
        cnpj: 3743893,
        website: 'site.com',
      },
      owner.id,
    );

    expect(companyRepo.companies).toHaveLength(1);
    expect(companyRepo.companies[0].owner_id).toBe(owner.id);
  });

  it('should throw user not found', async () => {
    await expect(
      async () =>
        await createCompany.execute(
          {
            name: 'name',
            website: 'website.com',
            cnpj: 213123,
          },
          'wrong_user_id',
        ),
    ).rejects.toThrow(new Error('User not found!'));
  });
});
