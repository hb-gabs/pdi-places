import { User } from '../../domain/user/user';
import { UserRepository } from '../../domain/user/user.repository';
import { hash } from '../utils/helpers';

type TInput = {
  name: string;
  email: string;
  password: string;
};

export class CreateUser {
  constructor(readonly userRepo: UserRepository) {}

  async execute(input: TInput): Promise<User> {
    const user = new User({
      name: input.name,
      email: input.email,
      password: hash(input.password),
    });
    await this.userRepo.save(user);
    return user;
  }
}
