import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { CompanySchema } from '../@core/infra/db/typeorm/schemas/company.schema';
import { CompanyTypeOrmRepository } from '../@core/infra/db/typeorm/repositories/company-typeorm.repository';
import { DataSource } from 'typeorm';
import { Company } from '../@core/domain/company/company';
import { CompanyMemoryRepository } from '../@core/infra/db/in-memory/company-memory.repository';
import { CreateCompany } from '../@core/application/company/create-company';
import { UserMemoryRespository } from '../@core/infra/db/in-memory/user-memory.repository';
import { ChangeCompanyResponsible } from '../@core/application/company/change-company-responsible';
import { CompanyRepository } from '../@core/domain/company/company.repository';
import { UserRepository } from '../@core/domain/user/user.repository';
import { UserTypeOrmRepository } from '../@core/infra/db/typeorm/repositories/user-typeorm.repository';
import { User } from '../@core/domain/user/user';
import { ListUserCompanies } from '../@core/application/company/list-user-companies';

@Module({
  imports: [TypeOrmModule.forFeature([CompanySchema])],
  controllers: [CompaniesController],
  providers: [
    CompaniesService,
    {
      provide: CompanyTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new CompanyTypeOrmRepository(dataSource.getRepository(Company));
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: UserTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new UserTypeOrmRepository(dataSource.getRepository(User));
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: CompanyMemoryRepository,
      useClass: CompanyMemoryRepository,
    },
    {
      provide: UserMemoryRespository,
      useClass: UserMemoryRespository,
    },
    {
      provide: CreateCompany,
      useFactory: (
        companyRepo: CompanyRepository,
        userRepo: UserRepository,
      ) => {
        return new CreateCompany(companyRepo, userRepo);
      },
      inject: [CompanyTypeOrmRepository, UserTypeOrmRepository],
    },
    {
      provide: ChangeCompanyResponsible,
      useFactory: (
        companyRepo: CompanyRepository,
        userRepo: UserRepository,
      ) => {
        return new ChangeCompanyResponsible(companyRepo, userRepo);
      },
      inject: [CompanyTypeOrmRepository, UserTypeOrmRepository],
    },
    {
      provide: ListUserCompanies,
      useFactory: (
        companyRepo: CompanyRepository,
        userRepo: UserRepository,
      ) => {
        return new ListUserCompanies(companyRepo, userRepo);
      },
      inject: [CompanyTypeOrmRepository, UserTypeOrmRepository],
    },
  ],
})
export class CompanysModule {}
