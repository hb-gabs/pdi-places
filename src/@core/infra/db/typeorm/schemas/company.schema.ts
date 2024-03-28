import { Company } from '../../../../domain/company/company';
import { EntitySchema } from 'typeorm';
import { UserSchema } from './user.schema';
import { User } from '../../../../../@core/domain/user/user';

export const CompanySchema = new EntitySchema<Company>({
  name: 'Company',
  target: Company,
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
    cnpj: {
      type: Number,
      nullable: false,
    },
    website: {
      type: String,
      length: 128,
      nullable: true,
    },
  },
  relations: {
    owner: {
      type: 'many-to-one',
      target: UserSchema,
      joinColumn: {
        name: 'owner_id',
      },
    },
  },
});
