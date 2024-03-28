import { IQueryOptions } from '../../../../application/utils/interfaces';
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
    options?: IQueryOptions,
  ): Promise<[Place[], number]> {
    return await this.ormRepo.findAndCount({
      where: {
        company: { id: companyId },
      },
      skip: options?.page * options?.pageSize,
      take: options?.pageSize,
    });
  }

  async save(input: Place): Promise<void> {
    await this.ormRepo.save(input);
  }

  async deletePlace(placeId: string): Promise<void> {
    await this.ormRepo.delete({ id: placeId });
    return;
  }
}
