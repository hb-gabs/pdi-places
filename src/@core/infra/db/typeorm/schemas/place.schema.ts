import { Place } from '../../../../domain/place/place';
import { EntitySchema } from 'typeorm';

export const PlaceSchema = new EntitySchema<Place>({
  name: 'place',
  target: Place,
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
    cep: {
      type: Number,
      nullable: false,
    },
    street: {
      type: String,
      length: 128,
      nullable: false,
    },
    number: {
      type: Number,
      nullable: false,
    },
    neighborhood: {
      type: String,
      length: 64,
      nullable: false,
    },
    city: {
      type: String,
      length: 64,
      nullable: false,
    },
    state: {
      type: String,
      length: 64,
      nullable: false,
    },
    company_id: {
      type: 'uuid',
      nullable: false,
    },
  },
  // relations: {
  //   company: {
  //     target: CompanySchema,
  //     type: 'many-to-one',
  //   },
  // },
});
