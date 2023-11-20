import { PlaceRepository } from '../../../@core/domain/place/place.repository';

export class GetPlaceById {
  constructor(private placeRepo: PlaceRepository) {}

  async execute(id: string) {
    return await this.placeRepo.findById(id);
  }
}
