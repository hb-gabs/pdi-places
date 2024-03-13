import { IQueryOptions } from 'src/@core/application/utils/interfaces';
import { Company } from './company';

export interface CompanyRepository {
  save(input: Company): Promise<void>;
  findById(id: string): Promise<Company>;
  findAllByOwnerId(
    ownerId: string,
    options: IQueryOptions,
  ): Promise<[Company[], number]>;
}
