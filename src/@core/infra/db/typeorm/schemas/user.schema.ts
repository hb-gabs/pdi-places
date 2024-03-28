import { User } from '../../../../domain/user/user';
import { Entity, EntitySchema, EntityTarget } from 'typeorm';
import { CompanySchema } from './company.schema';
import { Company } from '../../../../../@core/domain/company/company';

export const UserSchema = new EntitySchema<User>({
  name: 'User',
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
