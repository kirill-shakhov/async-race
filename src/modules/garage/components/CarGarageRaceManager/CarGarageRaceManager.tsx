import { useEffect, useRef } from 'react';
import { PlayIcon, XMarkIcon } from '@heroicons/react/16/solid';
import useCarGarageRaceManager from '@moduleGarage/components/CarGarageRaceManager/useCarGarageRaceManager.tsx';
import { Car } from '@moduleGarage/components';
import { useCarEngineControl } from '@moduleGarage/hooks/useCarEngineControl.ts';
import { useAppSelector } from '@/store/hooks.ts';
import {
  UiButton,
  UiButtonSize,
  UiButtonTheme,
} from '@/shared/components/UI/UiButton';

interface CarGarageRaceManagerProps {
  car: {
    id: number;
    name: string;
    color: string;
  };
  setCarRef: (ref: HTMLElement | null, id: number, index: number) => void;
  index: number;
}

function CarGarageRaceManager({
  car,
  setCarRef,
  index,
}: CarGarageRaceManagerProps) {
  const selectedCar = useAppSelector((state) => state.garage.selectedCar);
  const isRaceStarted = useAppSelector((state) => state.garage.isRaceStarted);

  const selectedCarId = selectedCar ? selectedCar.id : null;
  const { startCarEngine, stopCarEngine, engineStatus } = useCarEngineControl();

  const carRef = useRef<HTMLDivElement | null>(null);

  const { sendCarDeleteRequest, selectCar } = useCarGarageRaceManager();

  useEffect(() => {
    if (carRef.current) {
      setCarRef(carRef.current, car.id, index);
    }
  }, [carRef, car.id, index, setCarRef]);

  return (
    <div className="border-y-2 pt-2 border-gray-300 flex flex-col gap-7">
      <div className="flex gap-2">
        <div className="flex gap-2">
          <div className="buttons-group flex flex-col gap-2">
            <UiButton
              className={
                selectedCarId === car.id
                  ? 'bg-gray-200 text-black border-gray-300 hover:bg-gray-200'
                  : ''
              }
              size={UiButtonSize.SM}
              block
              disabled={engineStatus || isRaceStarted}
              onClick={() => selectCar(car)}
            >
              select
            </UiButton>

            <UiButton
              onClick={() => sendCarDeleteRequest(+car.id)}
              size={UiButtonSize.SM}
              block
              disabled={engineStatus || isRaceStarted}
              theme={UiButtonTheme.DANGER}
            >
              remove
            </UiButton>
          </div>

          <div className="buttons-group flex flex-col gap-2">
            <UiButton
              onClick={() => startCarEngine(car.id, carRef.current!)}
              size={UiButtonSize.SM}
              block
              disabled={engineStatus || isRaceStarted}
            >
              start <PlayIcon className="ml-1 size-3" />
            </UiButton>

            <UiButton
              onClick={() => stopCarEngine(car.id, carRef.current!)}
              size={UiButtonSize.SM}
              block
              disabled={!isRaceStarted && !engineStatus}
              theme={UiButtonTheme.DANGER}
            >
              stop
              <XMarkIcon className="ml-1 size-3" />
            </UiButton>
          </div>
        </div>

        <p className="text-black font-semibold">{car.name}</p>
      </div>

      <div className="race-track relative">
        <div ref={carRef} className="car-container inline-block">
          <Car color={car.color} />
        </div>

        <img
          src="https://cloud-read.s3.eu-west-3.amazonaws.com/books-previews/8740b4a3-c20b-45cd-a55d-49e12ec3566d.jpg"
          alt="finish"
          className="CarGarageRaceManager__image-finish absolute top-0 right-0 h-full z-[-1]"
        />
      </div>
    </div>
  );
}

export default CarGarageRaceManager;
