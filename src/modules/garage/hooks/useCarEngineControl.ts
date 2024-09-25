import { useState } from 'react';

import useCarAnimation from '@moduleGarage/hooks/useCarAnimation.ts';

import { toast } from 'react-toastify';

import {
  CarStatus,
  Id,
} from '@/services/api/controllers/asyncRaceApi/asyncRaceApi.types.ts';

import {
  useDriveCarMutation,
  useStartStopCarEngineMutation,
} from '@/services/api/controllers/asyncRaceApi/modules/carApi';

export const useCarEngineControl = () => {
  const [startStopCarEngine] = useStartStopCarEngineMutation();
  const [driveCar] = useDriveCarMutation();
  const { startAnimation, stopAnimation } = useCarAnimation();
  const [engineStatus, setEngineStatus] = useState(false);

  const startCarEngine = async (id: Id, carRef: HTMLElement) => {
    try {
      setEngineStatus(true);
      const response = await startStopCarEngine({
        id,
        status: CarStatus.STARTED,
      });

      if (response?.data) {
        const { velocity, distance } = response.data;

        const time = distance / velocity;
        const containerWidth =
          carRef.parentElement?.offsetWidth || document.body.clientWidth;
        const carWidth = carRef.offsetWidth;
        const initialPosition = carRef.offsetLeft || 0;
        const maxDistance = containerWidth - carWidth - initialPosition;
        const animationDistance = Math.min(distance, maxDistance);

        startAnimation(carRef, animationDistance, time, id);

        const driveResponse = await driveCar(id);
        if (!driveResponse?.data?.success) {
          stopAnimation(id);
          toast.error(`Car number ${id} broke down!`);
        }
      }
    } catch (e) {
      console.log(e);
      setEngineStatus(false);
    }
  };

  const stopCarEngine = async (id: Id, carRef: HTMLElement) => {
    try {
      await startStopCarEngine({ id, status: CarStatus.STOPPED });
      setEngineStatus(false);
      stopAnimation(id);
      carRef.style.transform = 'translateX(0px)';
    } catch (e) {
      console.log(e);
    }
  };

  return {
    startCarEngine,
    stopCarEngine,
    engineStatus,
  };
};
