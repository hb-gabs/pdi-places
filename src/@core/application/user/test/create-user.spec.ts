import { UserMemoryRespository } from '../../../infra/db/in-memory/user-memory.repository';
import { CreateUser } from '../create-user';

describe('Create User', () => {
  test('execution', async () => {
    const userRepo = new UserMemoryRespository();
    const createUser = new CreateUser(userRepo);

    expect(
      async () =>
        await createUser.execute({
          name: 'name',
          email: 'email',
          password: 'pass',
        }),
    ).not.toThrow();
  });
});
