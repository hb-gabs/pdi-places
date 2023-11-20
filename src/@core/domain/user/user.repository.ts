import { User } from './user';

export interface UserRepository {
  save(input: User): Promise<void>;
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User>;
}
