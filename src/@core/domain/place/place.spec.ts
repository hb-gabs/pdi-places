import { Company } from '../company/company';
import { Place } from './place';

describe('Place Entity', () => {
  const company = new Company(
    {
      name: 'Empresa',
      cnpj: 23849238492,
      website: 'Empresa.com',
    },
    '123',
  );

  const placeId = '123';
  const placeProps = {
    name: 'Name',
    cep: 55453454,
    city: 'Fort',
    neighborhood: 'Neighborhood',
    number: 345,
    state: 'CE',
    street: 'RUa tal',
    company: { id: company.id } as Company,
  };

  const place = new Place(placeProps, placeId);

  test('declaration', () => {
    expect(place.id).toBe(placeId);
    expect(place.name).toBe('Name');
    expect(place.company.id).toBe(company.id);
  });

  test('json', () => {
    expect({
      ...placeProps,
      id: placeId,
    }).toStrictEqual(place.toJSON());
  });
});
