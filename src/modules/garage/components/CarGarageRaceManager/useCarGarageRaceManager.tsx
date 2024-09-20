import {setCars, setTotalCount, setSelectedCar} from "@moduleGarage/store";
import {
  useDeleteCarMutation,
  useGetCarsQuery,
} from "@/services/api/controllers/asyncRaceApi/modules/carApi";

import {useAppDispatch, useAppSelector} from "@/store/hooks.ts";

import {DEFAULT_GARAGE_CARS_PER_PAGE} from "@/services/api/controllers/asyncRaceApi/modules/carApi/CarApi.constants.ts";
import {Car} from "@moduleGarage/static/types";
import {useCarEngineControl} from "@moduleGarage/hooks/useCarEngineControl.ts";

const useCarGarageRaceManager = () => {
  const dispatch = useAppDispatch();
  const [deleteCar] = useDeleteCarMutation();
  const {startCarEngine, stopCarEngine, engineStatus} = useCarEngineControl();

  let currentPage = useAppSelector(state => state.garage.currentPage);
  const {refetch} = useGetCarsQuery({page: currentPage, limit: DEFAULT_GARAGE_CARS_PER_PAGE});


  const sendCarDeleteRequest = async (id: number): Promise<void> => {
    try {
      await deleteCar(id);

      const refetchResponse = await refetch();

      if (refetchResponse.data) {
        const {cars, totalCount} = refetchResponse.data;
        dispatch(setCars(cars));
        dispatch(setTotalCount(totalCount));
      }
    } catch (e) {
      console.log(e);
    }
  }

  const selectCar = (car: Car) => {
    dispatch(setSelectedCar(car));
  }

  return {
    sendCarDeleteRequest,
    selectCar,
    engineStatus,
    startCarEngine,
    stopCarEngine,
  }
}

export default useCarGarageRaceManager;