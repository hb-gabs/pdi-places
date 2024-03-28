import { IQueryOptions } from 'src/@core/application/utils/interfaces';
import { User } from './user';

export interface UserRepository {
  save(input: User): Promise<void>;
  findAll(options?: IQueryOptions): Promise<[User[], number]>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
}
