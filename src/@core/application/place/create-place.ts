import { Company } from '../../../@core/domain/company/company';
import { CompanyRepository } from '../../domain/company/company.repository';
import { Place } from '../../domain/place/place';
import { PlaceRepository } from '../../domain/place/place.repository';

type TInput = {
  name: string;
  cep: number;
  street: string;
  number: number;
  neighborhood: string;
  city: string;
  state: string;
};

export class CreatePlace {
  constructor(
    readonly placeRepo: PlaceRepository,
    readonly companyRepo: CompanyRepository,
  ) {}

  async execute(input: TInput, companyId: string): Promise<void> {
    const company = await this.companyRepo.findById(companyId);
    const place = new Place({
      name: input.name,
      cep: input.cep,
      street: input.street,
      number: input.number,
      city: input.city,
      neighborhood: input.neighborhood,
      state: input.state,
      company: { id: company.id } as Company,
    });
    await this.placeRepo.save(place);
    return;
  }
}
