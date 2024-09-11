export interface Winner {
  id: number,
  wins: number,
  time: number
}

export type WInnerWithoutId= Omit<Winner, 'id'>;