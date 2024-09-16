import {Car} from '@moduleGarage/static/types';
import {Winner} from "@moduleWinners/static/types";
import { PaginationParams } from '@/shared/types';

export interface CarsResponse {
  cars: Car[];
}

export interface CarsQueryResponse {
  cars: Car[];
  totalCount: number;
}

export interface GetCarsQueryParams {
  page?: number;
  limit?: number;
}

export type Id = number;

export type CarStatus = 'started' | 'stopped';

export interface CarDriveData {
  velocity: number;
  distance: number;
}

export interface WinnersResponse {
  winners: Winner[];
}


export type GetWinnersQueryParams = PaginationParams &  {
  sort?: string;
  order?: 'ASC' | 'DESC';
}
