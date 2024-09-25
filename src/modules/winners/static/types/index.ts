import { Car } from '@moduleGarage/static/types';

export interface Winner {
  id: number;
  wins: number;
  time: number;
}

export type WInnerWithoutId = Omit<Winner, 'id'>;

export type WInnerWithoutWins = Omit<Winner, 'wins'>;

export type WinnerWithInfo = Winner & Car;
