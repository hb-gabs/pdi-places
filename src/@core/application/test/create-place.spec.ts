import { Company } from '../../domain/company/company';
import { User } from '../../domain/user/user';
import { CompanyMemoryRepository } from '../../infra/db/in-memory/company-memory.repository';
import { PlaceMemoryRepository } from '../../infra/db/in-memory/place-memory.repository';
import { CreatePlace } from '../place/create-place';
import { Exception } from '../utils/app-exception';

describe('Create Place', () => {
  const placeRepo = new PlaceMemoryRepository();
  const companyRepo = new CompanyMemoryRepository();
  const createPlace = new CreatePlace(placeRepo, companyRepo);
  test('execution', async () => {
    const company = new Company(
      {
        name: 'Empresa',
        cnpj: 23849238492,
        website: 'Empresa.com',
        owner_id: 'any',
      },
      '123',
    );

    await companyRepo.save(company);

    await createPlace.execute(
      {
        name: 'Name',
        cep: 55453454,
        city: 'Fort',
        neighborhood: 'Neighborhood',
        number: 345,
        state: 'CE',
        street: 'RUa tal',
      },
      company.id,
    );

    expect(placeRepo.places).toHaveLength(1);
    expect(placeRepo.places[0].name).toStrictEqual('Name');
  });

  it('should throw company not found', async () => {
    await expect(
      async () =>
        await createPlace.execute(
          {
            name: 'Name',
            cep: 55453454,
            city: 'Fort',
            neighborhood: 'Neighborhood',
            number: 345,
            state: 'CE',
            street: 'RUa tal',
          },
          'wrong-company-id',
        ),
    ).rejects.toThrow(new Exception('Company not found!'));
  });
});
