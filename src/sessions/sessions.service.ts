import { Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { SignIn } from '../@core/application/session/sign-in';

@Injectable()
export class SessionsService {
  constructor(
    readonly signIn: SignIn,
  ) {}

  create(createSessionDto: CreateSessionDto) {
    const response = this.signIn.execute(createSessionDto);

    return response;
  }
}
