import { User } from '../user/user';
import { Company } from './company';

describe('Company test', () => {
  const user = new User(
    {
      name: 'usuario',
      email: 'email.com',
      password: 'pass',
    },
    '678',
  );

  const companyProps = {
    name: 'Empresa',
    cnpj: 23849238492,
    website: 'Empresa.com',
    owner: { id: user.id } as User,
  };

  const companyId = '123';

  const company = new Company(companyProps, companyId);

  test('Declaration', () => {
    expect(company.id).toBe('123');
    expect(company.name).toBe('Empresa');
    expect(company.owner.id).toStrictEqual(user.id);
  });

  test('to json', () => {
    expect(company.toJSON()).toStrictEqual({
      ...companyProps,
      id: companyId,
    });
  });
});
