import { IQueryOptions } from '../../../../application/utils/query-options';
import { Place } from '../../../../domain/place/place';
import { PlaceRepository } from '../../../../domain/place/place.repository';
import { Repository } from 'typeorm';

export class PlaceTypeOrmRepository implements PlaceRepository {
  constructor(private ormRepo: Repository<Place>) {}

  async findById(placeId: string): Promise<Place> {
    return await this.ormRepo.findOne({ where: { id: placeId } });
  }

  async findAllByCompanyId(
    companyId: string,
    options: IQueryOptions,
  ): Promise<Place[]> {
    return await this.ormRepo.findBy({ company_id: companyId });
  }

  async save(input: Place): Promise<void> {
    await this.ormRepo.save(input);
  }

  async deletePlace(placeId: string): Promise<void> {
    await this.ormRepo.delete({ id: placeId });
    return;
  }
}
