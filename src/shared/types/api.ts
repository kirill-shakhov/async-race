import {SortDirection} from "@/shared/types/api.enums.ts";

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface SortableParams {
  sort?: string;
  order?: SortDirection;
}