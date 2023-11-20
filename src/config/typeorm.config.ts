import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanySchema } from '../@core/infra/db/typeorm/schemas/company.schema';
import { PlaceSchema } from '../@core/infra/db/typeorm/schemas/place.schema';
import { UserSchema } from '../@core/infra/db/typeorm/schemas/user.schema';

export const typeOrmConfig: TypeOrmModule = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'places',
  username: 'postgres',
  password: 'postgres',
  entities: [UserSchema, PlaceSchema, CompanySchema],
  logging: false,
};
