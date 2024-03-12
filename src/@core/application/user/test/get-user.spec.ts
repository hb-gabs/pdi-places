import { UserMemoryRespository } from '../../../infra/db/in-memory/user-memory.repository';
import { GetUser } from '../get-user';
import { User } from '../../../domain/user/user';

describe('get one user', () => {
  test('execution', async () => {
    const userRepo = new UserMemoryRespository();
    const getUser = new GetUser(userRepo);
    const user = new User({
      email: 'exemplo@gmail.com',
      name: 'name',
      password: 'pass123',
    });
    const userId = user.id;
    await userRepo.save(user);

    const foundUser = await getUser.execute(userId);

    expect(user).toBe(foundUser);
  });
});
