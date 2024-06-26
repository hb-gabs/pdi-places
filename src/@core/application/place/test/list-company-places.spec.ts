import { PlaceMemoryRepository } from '../../../infra/db/in-memory/place-memory.repository';
import { ListCompanyPlaces } from '../list-company-places';
import { Place } from '../../../domain/place/place';
import { Company } from '../../../../@core/domain/company/company';

describe('list company places', () => {
  const companyId = '123';

  const place = new Place({
    name: 'Name',
    cep: 55453454,
    city: 'Fort',
    neighborhood: 'Neighborhood',
    number: 345,
    state: 'CE',
    street: 'RUa tal',
    company: { id: companyId } as Company,
  });

  const placeRepo = new PlaceMemoryRepository();

  const listCompanyPlaces = new ListCompanyPlaces(placeRepo);

  test('execution with right id', async () => {
    await placeRepo.save(place);
    const places = await listCompanyPlaces.execute(companyId);

    expect(places).toStrictEqual([[place], 1]);
  });

  test('execution with wrong id', async () => {
    const places = await listCompanyPlaces.execute('wrong id');

    expect(places).toStrictEqual([[], 0]);
  });
});
