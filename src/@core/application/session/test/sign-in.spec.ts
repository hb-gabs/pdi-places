import { UserMemoryRespository } from "../../../infra/db/in-memory/user-memory.repository"
import { SignIn } from "../sign-in"
import { User } from "../../../../@core/domain/user/user"
import { CreateUser } from "../../user/create-user"

describe('sign in', () => {
  test('execution', async () => {
    const email = 'test@gmail.com';
    const password = 'test@gmail.com';
    
    const userRepo = new UserMemoryRespository();

    const createUser = new CreateUser(userRepo)

    await createUser.execute({
      name: 'Test',
      email,
      password,
    });
    
    const signIn = new SignIn(userRepo);

    const response = await signIn.execute({
      email,
      password,
    });

    expect(response.email).toStrictEqual(email);
    expect(typeof response.token).toStrictEqual('string');

  })
})