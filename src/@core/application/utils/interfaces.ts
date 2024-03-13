export interface IQueryOptions {
  page?: number;
  pageSize?: number;
  orderBy?: 'ASC' | 'DESC';
  startDate?: Date | string;
  endDate?: Date | string;
}
