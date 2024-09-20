import {setCars, setTotalCount, setSelectedCar} from "@moduleGarage/store";
import {
  useDeleteCarMutation, useDriveCarMutation,
  useGetCarsQuery,
  useStartStopCarEngineMutation
} from "@/services/api/controllers/asyncRaceApi/modules/carApi";

import {useAppDispatch, useAppSelector} from "@/store/hooks.ts";

import {DEFAULT_GARAGE_CARS_PER_PAGE} from "@/services/api/controllers/asyncRaceApi/modules/carApi/CarApi.constants.ts";
import {Car, CarWithoutId} from "@moduleGarage/static/types";
import {CarStatus, Id} from "@/services/api/controllers/asyncRaceApi/asyncRaceApi.types.ts";
import {useState} from "react";
import useCarAnimation from "@moduleGarage/hooks/useCarAnimation.ts";

const useCarGarageRaceManager = () => {
  const dispatch = useAppDispatch();
  const [deleteCar] = useDeleteCarMutation();
  const [startStopCarEngine] = useStartStopCarEngineMutation();
  const [driveCar] = useDriveCarMutation();
  const {startAnimation, stopAnimation} = useCarAnimation();


  let currentPage = useAppSelector(state => state.garage.currentPage);
  const {refetch} = useGetCarsQuery({page: currentPage, limit: DEFAULT_GARAGE_CARS_PER_PAGE});
  const [engineStatus, setEngineStatus] = useState(false);

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


  const startCarEngine = async (id: Id, carRef: HTMLElement) => {
    try {
      setEngineStatus(true);
      const response = await startStopCarEngine({id, status: CarStatus.STARTED});

      if (response?.data) {
        const {velocity, distance} = response.data;

        const time = distance / velocity;
        const containerWidth = carRef.parentElement?.offsetWidth || document.body.clientWidth;
        const carWidth = carRef.offsetWidth;
        const initialPosition = carRef.offsetLeft || 0;
        const maxDistance = containerWidth - carWidth - initialPosition;
        const animationDistance = Math.min(distance, maxDistance);

        startAnimation(carRef, animationDistance, time);

        const driveResponse = await driveCar(id);
        if (!driveResponse?.data?.success) {
          console.log('сломалась')
          stopAnimation();
        }
      }
    } catch (e) {
      console.log(e);
      setEngineStatus(false);
    }
  };

  const stopCarEngine = async (id: Id, carRef: HTMLElement) => {
    try {
      await startStopCarEngine({id, status: CarStatus.STOPPED});
      setEngineStatus(false);
      stopAnimation();
      carRef.style.transform = 'translateX(0px)';
    } catch (e) {
      console.log(e);
    }
  };


  return {
    sendCarDeleteRequest,
    selectCar,
    engineStatus,
    startCarEngine,
    stopCarEngine,
  }
}

export default useCarGarageRaceManager;