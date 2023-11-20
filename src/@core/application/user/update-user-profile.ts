import { UserRepository } from '../../domain/user/user.repository';

type TUpdateUser = {
  name: string;
};

export class UpdateUserProfile {
  constructor(readonly userRepo: UserRepository) {}

  async execute(id: string, input: TUpdateUser): Promise<void> {
    const user = await this.userRepo.findById(id);
    user.updateName(input.name);
  }
}
