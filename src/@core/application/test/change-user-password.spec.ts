import { User } from '../../domain/user/user';
import { UserMemoryRespository } from '../../infra/db/in-memory/user-memory.repository';
import { ChangeUserPassword } from '../user/change-user-password';
import { CreateUser } from '../user/create-user';
import { Exception } from '../utils/app-exception';
import { hash } from '../utils/credentials';

describe('change user password', () => {
  const oldPassword = 'pass123';
  const newPassword = 'newpassword123';
  let userId: string;

  const userProps = {
    name: 'user',
    email: 'user@email.com',
    password: oldPassword,
  };

  const userRepo = new UserMemoryRespository();
  const createUser = new CreateUser(userRepo);
  const changeUserPassword = new ChangeUserPassword(userRepo);

  test('execution', async () => {
    const user = await createUser.execute(userProps);
    userId = user.id;

    await changeUserPassword.execute(userId, oldPassword, newPassword);

    expect(userRepo.users[0].password).toBe(newPassword);
  });

  test('wrong old password', async () => {
    await expect(
      async () =>
        await changeUserPassword.execute(userId, 'wrong-password', 'new-pass'),
    ).rejects.toThrow(new Exception('Password is wrong!', 401));
  });
});
