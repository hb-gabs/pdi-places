import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { TypeOrmModule, getDataSourceToken } from '@nestjs/typeorm';
import { UserSchema } from '../@core/infra/db/typeorm/schemas/user.schema';
import { UserTypeOrmRepository } from 'src/@core/infra/db/typeorm/repositories/user-typeorm.repository';
import { DataSource } from 'typeorm';
import { User } from 'src/@core/domain/user/user';
import { SignIn } from 'src/@core/application/session/sign-in';
import { UserRepository } from 'src/@core/domain/user/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema])],
  controllers: [SessionsController],
  providers: [
    SessionsService,
    {
      provide: UserTypeOrmRepository,
      useFactory: (dataSource: DataSource) => {
        return new UserTypeOrmRepository(dataSource.getRepository(User));
      },
      inject: [getDataSourceToken()],
    },
    {
      provide: SignIn,
      useFactory: (userRepo: UserRepository) => {
        return new SignIn(userRepo);
      },
      inject: [UserTypeOrmRepository],
    },
  ]
})
export class SessionsModule {}
