import { UserRepository } from '../../domain/user/user.repository';
import { Exception } from '../utils/app-exception';
import { checkPassword } from '../utils/helpers';

export class ChangeUserPassword {
  constructor(private userRepo: UserRepository) {}

  async execute(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ): Promise<void> {
    const user = await this.userRepo.findById(userId);

    if (!user) {
      throw new Exception('User not found', 401);
    }

    if (!checkPassword(oldPassword, user.password)) {
      throw new Exception('Password is wrong!', 401);
      return;
    }
    
    user.password = newPassword;
 
    await this.userRepo.save(user);
  }
}
