export interface Car {
  name: string;
  color: string;
  id: number;
}

export type CarWithoutId = Omit<Car, 'id'>;

