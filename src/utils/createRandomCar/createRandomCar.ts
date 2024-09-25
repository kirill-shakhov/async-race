import { CarWithoutId } from '@moduleGarage/static/types';
import { getRandomColor } from '@/utils/getRandomColor/getRandomColor.ts';

const firstPartNames = [
  'Tesla',
  'Ford',
  'BMW',
  'Audi',
  'Toyota',
  'Mercedes',
  'Honda',
  'Chevrolet',
  'Kia',
  'Nissan',
];
const secondPartNames = [
  'Model S',
  'Mustang',
  'Civic',
  'Corolla',
  'Focus',
  'Accord',
  'Camaro',
  'Optima',
  'Altima',
  'X5',
];

export const createRandomCar = (): CarWithoutId => {
  const randomFirstPart =
    firstPartNames[Math.floor(Math.random() * firstPartNames.length)];
  const randomSecondPart =
    secondPartNames[Math.floor(Math.random() * secondPartNames.length)];
  const randomColor = getRandomColor();

  return {
    name: `${randomFirstPart} ${randomSecondPart}`,
    color: randomColor,
  };
};
