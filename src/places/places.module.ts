import { Module } from '@nestjs/common';
import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { PlaceSchema } from '../@core/infra/db/typeorm/schemas/place.schema';
import { PlaceTypeOrmRepository } from '../@core/infra/db/typeorm/repositories/place-typeorm.repository';
import { DataSource } from 'typeorm';
import { Place } from '../@core/domain/place/place';
import { CreatePlace } from '../@core/application/place/create-place';
import { PlaceRepository } from '../@core/domain/place/place.repository';
import { CompanyRepository } from '../@core/domain/company/company.repository';
import { PlaceMemoryRepository } from '../@core/infra/db/in-memory/place-memory.repository';
import { CompanyMemoryRepository } from '../@core/infra/db/in-memory/company-memory.repository';
import { ListCompanyPlaces } from '../@core/application/place/list-company-places';
import { CompanyTypeOrmRepository } from '../@core/infra/db/typeorm/repositories/company-typeorm.repository';
import { Company } from '../@core/domain/company/company';
import { GetPlaceById } from '../@core/application/place/get-place';
import { DeletePlace } from 'src/@core/application/place/delete-place';

@Module({
  imports: [TypeOrmModule.forFeature([PlaceSchema])],
  controllers: [PlacesController],
  providers: [
    PlacesService,
    {
      provide: PlaceTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new PlaceTypeOrmRepository(dataSource.getRepository(Place));
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: CompanyTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new CompanyTypeOrmRepository(dataSource.getRepository(Company));
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: PlaceMemoryRepository,
      useClass: PlaceMemoryRepository,
    },
    {
      provide: CompanyMemoryRepository,
      useClass: CompanyMemoryRepository,
    },
    {
      provide: CreatePlace,
      useFactory: (
        placeRepo: PlaceRepository,
        companyRepo: CompanyRepository,
      ) => {
        return new CreatePlace(placeRepo, companyRepo);
      },
      inject: [PlaceTypeOrmRepository, CompanyTypeOrmRepository],
    },
    {
      provide: ListCompanyPlaces,
      useFactory: (placeRepo: PlaceRepository) => {
        return new ListCompanyPlaces(placeRepo);
      },
      inject: [PlaceTypeOrmRepository],
    },
    {
      provide: GetPlaceById,
      useFactory: (placeRepo: PlaceRepository) => {
        return new GetPlaceById(placeRepo);
      },
      inject: [PlaceTypeOrmRepository],
    },
    {
      provide: DeletePlace,
      useFactory: (placeRepo: PlaceRepository) => {
        return new DeletePlace(placeRepo);
      },
      inject: [PlaceTypeOrmRepository],
    },
  ],
})
export class PlacesModule {}
