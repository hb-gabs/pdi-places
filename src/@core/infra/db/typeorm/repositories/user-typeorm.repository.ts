import { IQueryOptions } from 'src/@core/application/utils/interfaces';
import { User } from '../../../../domain/user/user';
import { UserRepository } from '../../../../domain/user/user.repository';
import { Repository } from 'typeorm';

export class UserTypeOrmRepository implements UserRepository {
  constructor(private ormRepo: Repository<User>) {}

  async findAll(options?: IQueryOptions): Promise<[User[], number]> {
    return await this.ormRepo.findAndCount({
      skip: options?.page * options?.pageSize,
      take: options?.pageSize,
    });
  }

  async findById(id: string): Promise<User> {
    return await this.ormRepo.findOne({
      where: { id },
    });
  }

  async save(input: User): Promise<void> {
    await this.ormRepo.save(input);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.ormRepo.findOneBy({ email });
  }
}
