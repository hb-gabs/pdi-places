import { Place } from '../../domain/place/place';
import { PlaceRepository } from '../../domain/place/place.repository';
import { IQueryOptions } from '../utils/interfaces';

export class ListCompanyPlaces {
  constructor(readonly placeRepo: PlaceRepository) {}

  async execute(companyId: string, options?: IQueryOptions): Promise<Place[]> {
    return this.placeRepo.findAllByCompanyId(companyId, options);
  }
}
