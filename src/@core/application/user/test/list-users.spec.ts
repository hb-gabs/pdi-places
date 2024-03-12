import { UserMemoryRespository } from '../../../infra/db/in-memory/user-memory.repository';
import { ListUsers } from '../list-users';
import { User } from '../../../domain/user/user';

describe('List users', () => {
  const userRepo = new UserMemoryRespository();
  const listUsers = new ListUsers(userRepo);

  test('execution', async () => {
    expect(userRepo.users).toStrictEqual([]);

    const user = new User({
      email: 'email@gmail.com',
      name: 'name',
      password: 'pass123',
    });

    await userRepo.save(user);

    const users = await listUsers.execute();

    expect(users).toStrictEqual([user]);
  });
});
