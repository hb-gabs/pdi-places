import { User } from '../../../../domain/user/user';
import { EntitySchema } from 'typeorm';

export const UserSchema = new EntitySchema<User>({
  name: 'user',
  target: User,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
    },
    name: {
      type: String,
      length: 64,
      nullable: false,
    },
    email: {
      type: String,
      length: 64,
      nullable: false,
    },
    password: {
      type: String,
      length: 255,
      nullable: false,
    },
  },
});
