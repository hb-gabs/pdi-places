import { CompanySchema } from "../@core/infra/db/typeorm/schemas/company.schema";
import { PlaceSchema } from "../@core/infra/db/typeorm/schemas/place.schema";
import { UserSchema } from "../@core/infra/db/typeorm/schemas/user.schema";
import { DataSource } from "typeorm";
import path from 'path';

const migrationsPath = path.resolve(__dirname, 'migrations', '*.ts');

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'places2',
  password: 'postgres',
  username: 'postgres',
  migrationsRun: true,
  entities: [
    UserSchema,
    CompanySchema,
    PlaceSchema,
  ],
  migrations: [migrationsPath],
  synchronize: false,
})