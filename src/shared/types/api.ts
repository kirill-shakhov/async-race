export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface SortableParams {
  sort?: string;
  order?: 'ASC' | 'DESC';
}