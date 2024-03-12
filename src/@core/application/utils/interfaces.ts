export interface IQueryOptions {
  page?: number;
  pageSize?: number;
  name?: string;
  orderBy?: 'ASC' | 'DESC';
  startDate?: Date | string;
  endDate?: Date | string;
}
