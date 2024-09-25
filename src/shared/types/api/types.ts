import { SortDirection } from './enums.ts';

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface SortableParams {
  sort?: string;
  order?: SortDirection;
}
