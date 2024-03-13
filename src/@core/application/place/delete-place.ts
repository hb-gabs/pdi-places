import { PlaceRepository } from '../../../@core/domain/place/place.repository';

export class DeletePlace {
  constructor(readonly placeRepo: PlaceRepository) {}

  async execute(placeId: string): Promise<void> {
    return this.placeRepo.deletePlace(placeId);
  }
}
