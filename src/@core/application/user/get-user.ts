import { User } from '../../domain/user/user';
import { UserRepository } from '../../domain/user/user.repository';
import { Exception } from '../utils/app-exception';

export class GetUser {
  constructor(private userRepo: UserRepository) {}

  async execute(id: string): Promise<User> {
    const user = await this.userRepo.findById(id);

    if (!user) {
      throw new Exception('User not found', 400);
    }

    return user;
  }
}
