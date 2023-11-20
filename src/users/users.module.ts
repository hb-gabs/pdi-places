import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { User } from '../@core/domain/user/user';
import { UserTypeOrmRepository } from '../@core/infra/db/typeorm/repositories/user-typeorm.repository';
import { UserMemoryRespository } from '../@core/infra/db/in-memory/user-memory.repository';
import { DataSource } from 'typeorm';
import { CreateUser } from '../@core/application/user/create-user';
import { UserRepository } from '../@core/domain/user/user.repository';
import { ListUsers } from '../@core/application/user/list-users';
import { ChangeUserPassword } from '../@core/application/user/change-user-password';
import { GetUser } from '../@core/application/user/get-user';
import { UpdateUserProfile } from '../@core/application/user/update-user-profile';
import { UserSchema } from '../@core/infra/db/typeorm/schemas/user.schema';

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema])],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: UserTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new UserTypeOrmRepository(dataSource.getRepository(User));
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: UserMemoryRespository,
      useClass: UserMemoryRespository,
    },
    {
      provide: CreateUser,
      useFactory: (userRepo: UserRepository) => {
        return new CreateUser(userRepo);
      },
      inject: [UserTypeOrmRepository],
    },
    {
      provide: GetUser,
      useFactory: (userRepo: UserRepository) => {
        return new GetUser(userRepo);
      },
      inject: [UserTypeOrmRepository],
    },
    {
      provide: ListUsers,
      useFactory: (userRepo: UserRepository) => {
        return new ListUsers(userRepo);
      },
      inject: [UserTypeOrmRepository],
    },
    {
      provide: ChangeUserPassword,
      useFactory: (userRepo: UserRepository) => {
        return new ChangeUserPassword(userRepo);
      },
      inject: [UserTypeOrmRepository],
    },
    {
      provide: UpdateUserProfile,
      useFactory: (userRepo: UserRepository) => {
        return new UpdateUserProfile(userRepo);
      },
      inject: [UserTypeOrmRepository],
    },
  ],
})
export class UsersModule {}
