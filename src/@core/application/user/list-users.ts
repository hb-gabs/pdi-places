import { User } from '../../domain/user/user';
import { UserRepository } from '../../domain/user/user.repository';
import { IQueryOptions } from '../utils/interfaces';

export class ListUsers {
  constructor(readonly userRepo: UserRepository) {}

  async execute(options?: IQueryOptions): Promise<[User[], number]> {
    return await this.userRepo.findAll(options);
  }
}
