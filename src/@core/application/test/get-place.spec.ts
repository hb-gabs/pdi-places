import { PlaceMemoryRepository } from '../../../@core/infra/db/in-memory/place-memory.repository';
import { GetPlaceById } from '../place/get-place';
import { Place } from '../../../@core/domain/place/place';

describe('Get place by id', () => {
  test('execute', async () => {
    const placeRepo = new PlaceMemoryRepository();
    const getPlaceById = new GetPlaceById(placeRepo);

    const place = new Place({
      cep: 123123,
      city: 'Fortaelza',
      company_id: '123',
      name: 'Lugar teste',
      neighborhood: 'Vizinhança',
      number: 123,
      state: 'CE',
      street: 'Rua tal',
    });

    const placeId = place.id;

    await placeRepo.save(place);

    const res = await getPlaceById.execute(placeId);

    expect(res).toStrictEqual(place);
  });
});
