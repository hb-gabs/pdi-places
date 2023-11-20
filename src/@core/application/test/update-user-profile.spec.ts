import { UserMemoryRespository } from '../../infra/db/in-memory/user-memory.repository';
import { UpdateUserProfile } from '../user/update-user-profile';
import { User } from '../../domain/user/user';

describe('update user profile', () => {
  test('execution', async () => {
    const userRepo = new UserMemoryRespository();
    const updateUserProfile = new UpdateUserProfile(userRepo);

    const user = new User({
      name: 'old-name',
      email: 'example@gmail.com',
      password: 'pass123',
    });

    const userId = user.id;

    await userRepo.save(user);

    await updateUserProfile.execute(userId, {
      name: 'new-name',
    });

    const foundUser = await userRepo.findById(userId);

    expect(foundUser.name).toBe('new-name');
  });
});
