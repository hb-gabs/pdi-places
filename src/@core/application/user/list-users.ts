import { User } from '../../domain/user/user';
import { UserRepository } from '../../domain/user/user.repository';

export class ListUsers {
  constructor(readonly userRepo: UserRepository) {}

  async execute(): Promise<User[]> {
    return await this.userRepo.findAll();
  }
}
