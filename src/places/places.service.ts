import { HttpException, Injectable } from '@nestjs/common';
import { CreatePlaceDto } from './dto/create-place.dto';
import { CreatePlace } from '../@core/application/place/create-place';
import { ListCompanyPlaces } from '../@core/application/place/list-company-places';
import { GetPlaceById } from '../@core/application/place/get-place';

@Injectable()
export class PlacesService {
  constructor(
    private createPlace: CreatePlace,
    private listCompanyPlaces: ListCompanyPlaces,
    private getPlaceById: GetPlaceById,
  ) {}

  async create(createPlaceDto: CreatePlaceDto) {
    try {
      return await this.createPlace.execute(
        createPlaceDto,
        createPlaceDto.company_id,
      );
    } catch (error) {
      throw new HttpException(error.message, error.statusCode);
    }
  }

  async findAll(companyId: string) {
    try {
      return await this.listCompanyPlaces.execute(companyId);
    } catch (error) {
      throw new HttpException(error.message, error.statusCode);
    }
  }

  async findById(id: string) {
    try {
      return await this.getPlaceById.execute(id);
    } catch (error) {
      throw new HttpException(error.message, error.statusCode);
    }
  }
}
