import { Company } from './company';

export interface CompanyRepository {
  save(input: Company): Promise<void>;
  findById(id: string): Promise<Company>;
  findAllByOwnerId(ownerId: string): Promise<Company[]>;
}
