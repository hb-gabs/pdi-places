import { IQueryOptions } from 'src/@core/application/utils/interfaces';
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

  async findAllByCompanyId(
    companyId: string,
    options?: IQueryOptions,
  ): Promise<[Place[], number]> {
    const foundPlaces = this.places.filter(
      (place) => place.props.company.id === companyId,
    );
    return [foundPlaces, foundPlaces.length];
  }

  async deletePlace(placeId: string): Promise<void> {
    this.places = this.places.filter((place) => place.id !== placeId);
    return;
  }
}
