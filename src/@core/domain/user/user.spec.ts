import { Company } from '../company/company';
import { User } from './user';

describe('Test User entity', () => {
  const userProps = {
    name: 'usuario',
    email: 'email.com',
    password: 'pass',
  };

  const userId = '123';

  const user = new User(userProps, userId);

  test('declaration', () => {
    expect(user.id).toBe(userId);
    expect(user.name).toBe('usuario');
  });

  test('to json', () => {
    expect(user.toJSON()).toStrictEqual({
      ...userProps,
      id: userId,
    });
  });

  test('update name', () => {
    user.updateName('new-name');
    expect(user.name).toBe('new-name');
  });
});
