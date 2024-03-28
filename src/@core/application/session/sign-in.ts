import { UserRepository } from "src/@core/domain/user/user.repository";
import { Exception } from "../utils/app-exception";
import { checkPassword, genToken } from "../utils/helpers";

type TInput = {
  email: string;
  password: string;
}

type TOutput = {
  id: string;
  email: string;
  token: string;
}

export class SignIn {
  constructor (
    readonly userRepo: UserRepository
  ) {}

  async execute(input: TInput): Promise<TOutput> {
    const user = await this.userRepo.findByEmail(input.email);
    
    if (!user || !checkPassword(input.password, user.password)) {
      throw new Exception('Incorrect email and/or password', 401);
    }

    const token = genToken(user.id);

    if (!token) {
      throw new Exception('Error when generating token', 500);
    }

    return {
      id: user.id,
      email: user.email,
      token
    };
  }
}