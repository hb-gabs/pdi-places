import { Place } from '../../../../domain/place/place';
import { PlaceMemoryRepository } from '../place-memory.repository';

describe('Place Memory Repository', () => {
  const placeRepo = new PlaceMemoryRepository();
  const companyId = '123';

  const place = new Place({
    name: 'Name',
    cep: 55453454,
    city: 'Fort',
    neighborhood: 'Neighborhood',
    number: 345,
    state: 'CE',
    street: 'RUa tal',
    company_id: companyId,
  });

  test('insert place', async () => {
    await placeRepo.save(place);

    expect(placeRepo.places).toStrictEqual([place]);
  });

  test('get all comapany places', async () => {
    const otherCompanyId = 'other';

    const otherPlace = new Place({
      name: 'Name',
      cep: 55453454,
      city: 'Fort',
      neighborhood: 'Neighborhood',
      number: 345,
      state: 'CE',
      street: 'RUa tal',
      company_id: otherCompanyId,
    });

    await placeRepo.save(otherPlace);

    const places = await placeRepo.findAllByCompanyId(otherCompanyId);

    expect(places).toStrictEqual([[otherPlace], 1]);
    expect(placeRepo.places).toHaveLength(2);
  });

  test('get place by company id', async () => {
    const places = await placeRepo.findAllByCompanyId(companyId);

    expect(places[0]).toHaveLength(1);
  });
});
