import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { PlacesModule } from './places/places.module';
import { UsersModule } from './users/users.module';
import { CompanysModule } from './companies/companies.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    PlacesModule,
    CompanysModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
