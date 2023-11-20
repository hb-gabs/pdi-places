import { User } from '../../../../domain/user/user';
import { UserRepository } from '../../../../domain/user/user.repository';
import { Repository } from 'typeorm';

export class UserTypeOrmRepository implements UserRepository {
  constructor(private ormRepo: Repository<User>) {}

  async findAll(): Promise<User[]> {
    return await this.ormRepo.find();
  }

  async findById(id: string): Promise<User> {
    return await this.ormRepo.findOne({
      where: { id },
    });
  }

  async save(input: User): Promise<void> {
    await this.ormRepo.save(input);
  }
}
