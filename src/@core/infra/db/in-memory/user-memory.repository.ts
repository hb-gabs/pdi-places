import { UserRepository } from '../../../domain/user/user.repository';
import { User } from '../../../domain/user/user';
import { Exception } from '../../../application/utils/app-exception';

export class UserMemoryRespository implements UserRepository {
  users: User[] = [];

  async save(input: User): Promise<void> {
    if (input.id) {
      const user = this.users.find((u) => u.id === input.id);

      if (user) {
        this.users = this.users.map((u) => (u.id === input.id ? user : u));
        return;
      }
    }

    this.users.push(input);
    return;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new Exception('User not found!', 400);
    }
    return user;
  }
}
