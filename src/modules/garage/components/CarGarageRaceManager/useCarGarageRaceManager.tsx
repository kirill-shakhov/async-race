import useFetchAndUpdateCars from '@moduleGarage/hooks/useFetchAndUpdateCars.ts';

import { setSelectedCar } from '@moduleGarage/store';
import { removeWinner } from '@moduleWinners/store';
import { Car } from '@moduleGarage/static/types';
import { useDeleteCarMutation } from '@/services/api/controllers/asyncRaceApi/modules/carApi';

import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';

import { useDeleteWinnerMutation } from '@/services/api/controllers/asyncRaceApi/modules/winnerApi';

const useCarGarageRaceManager = () => {
  const dispatch = useAppDispatch();
  const [deleteCar] = useDeleteCarMutation();

  const currentPage = useAppSelector((state) => state.garage.currentPage);
  const [deleteWinner] = useDeleteWinnerMutation();
  const fetchAndUpdateCars = useFetchAndUpdateCars();

  const sendCarDeleteRequest = async (id: number): Promise<void> => {
    try {
      await deleteCar(id);
      await deleteWinner(id);
      await fetchAndUpdateCars(currentPage);

      dispatch(removeWinner(id));
    } catch (e) {
      console.log(e);
    }
  };

  const selectCar = (car: Car) => {
    dispatch(setSelectedCar(car));
  };

  return {
    sendCarDeleteRequest,
    selectCar,
  };
};

export default useCarGarageRaceManager;
