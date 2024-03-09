import { IQueryOptions } from '../../application/utils/query-options';
import { Place } from './place';

export interface PlaceRepository {
  save(input: Place): Promise<void>;
  findById(placeId: string): Promise<Place>;
  findAllByCompanyId(
    companyId: string,
    options: IQueryOptions,
  ): Promise<Place[]>;
  deletePlace(placeId: string): Promise<void>;
}
