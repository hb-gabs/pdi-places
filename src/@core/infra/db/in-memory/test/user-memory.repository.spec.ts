import { User } from '../../../../domain/user/user';
import { UserMemoryRespository } from '../user-memory.repository';

describe('User Memory Repository', () => {
  const userRepo = new UserMemoryRespository();
  let testId: string;
  it('should insert user', async () => {
    const userInput = {
      name: 'name',
      email: 'name@email.com',
      password: 'pass123',
    };

    const user = new User(userInput);
    testId = user.id;

    userRepo.save(user);

    expect(userRepo.users).toHaveLength(1);
    expect(userRepo.users).toStrictEqual([user]);
  });

  it('should return users', async () => {
    const users = await userRepo.findAll();

    expect(userRepo.users).toHaveLength(1);
    expect(userRepo.users).toStrictEqual(users[0]);
  });

  it('should return user by id', async () => {
    const user = await userRepo.findById(testId);

    expect(user.id).toBe(testId);
  });

  it('should throw error', async () => {
    await expect(
      async () => await userRepo.findById('wrong-id'),
    ).rejects.toThrow();
  });
});
