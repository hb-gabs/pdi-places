import { Place } from '../../../domain/place/place';
import { PlaceRepository } from '../../../domain/place/place.repository';

export class PlaceMemoryRepository implements PlaceRepository {
  places: Place[] = [];

  async save(input: Place): Promise<void> {
    this.places.push(input);
    return;
  }

  async findById(placeId: string): Promise<Place> {
    return this.places.find((p) => p.id === placeId);
  }

  async findAllByCompanyId(companyId: string): Promise<Place[]> {
    return this.places.filter((place) => place.props.company_id === companyId);
  }
}
