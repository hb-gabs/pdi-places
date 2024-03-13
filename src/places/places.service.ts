import { HttpException, Injectable } from '@nestjs/common';
import { CreatePlaceDto } from './dto/create-place.dto';
import { CreatePlace } from '../@core/application/place/create-place';
import { ListCompanyPlaces } from '../@core/application/place/list-company-places';
import { GetPlaceById } from '../@core/application/place/get-place';
import { DeletePlace } from '../@core/application/place/delete-place';

@Injectable()
export class PlacesService {
  constructor(
    private createPlace: CreatePlace,
    private listCompanyPlaces: ListCompanyPlaces,
    private getPlaceById: GetPlaceById,
    private deletePlace: DeletePlace,
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

  async findAll(companyId: string, query: any) {
    try {
      return await this.listCompanyPlaces.execute(companyId, query);
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

  async delPlace(id: string) {
    try {
      return await this.deletePlace.execute(id);
    } catch (error) {
      throw new HttpException(error?.message, error?.statusCode);
    }
  }
}
