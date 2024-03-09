import { PlaceMemoryRepository } from "../../../@core/infra/db/in-memory/place-memory.repository";
import { Place } from "../../../@core/domain/place/place";
import { DeletePlace } from "../place/delete-place";

describe('Delete Place', () => {

  const placeId = '12312';

  const place = new Place({
    name: 'Name',
    cep: 12301293,
    city: 'Fokasod',
    company_id: 'q9e123',
    neighborhood: '2093012',
    number: 123,
    state: 'asoidj',
    street: 'o10923',
  }, placeId);

  const placeRepo = new PlaceMemoryRepository();

  const deletePlace = new DeletePlace(placeRepo);

  placeRepo.save(place);
  
  test('delete place', async () => {
    expect(placeRepo.places).toStrictEqual([place]);

    await deletePlace.execute(placeId);
    
    expect(placeRepo.places).toStrictEqual([]);
  })

})