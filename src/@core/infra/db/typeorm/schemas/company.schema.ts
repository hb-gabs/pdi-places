import { Company } from '../../../../domain/company/company';
import { EntitySchema } from 'typeorm';
import { UserSchema } from './user.schema';

export const CompanySchema = new EntitySchema<Company>({
  name: 'company',
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
    owner_id: {
      type: 'uuid',
      nullable: false,
    },
  },
  // relations: {
  //   owner_id: {
  //     target: UserSchema,
  //     type: 'many-to-one',
  //   },
  // },
});
