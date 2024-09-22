import React, {useEffect, useRef} from "react";
import {UiButton} from "@/shared/components/UI/UiButton";
import {PlayIcon, XMarkIcon} from "@heroicons/react/16/solid";
import useCarGarageRaceManager from "@moduleGarage/components/CarGarageRaceManager/useCarGarageRaceManager.tsx";
import {useAppSelector} from "@/store/hooks.ts";
import {Car} from "@moduleGarage/components";
import {useCarEngineControl} from "@moduleGarage/hooks/useCarEngineControl.ts";

interface CarGarageRaceManagerProps {
  car: {
    id: number;
    name: string;
    color: string;
  };
  setCarRef: (ref: HTMLElement | null, id: number, index: number) => void;
  index: number;
}

const CarGarageRaceManager = ({car, setCarRef, index}: CarGarageRaceManagerProps) => {
  let selectedCar = useAppSelector(state => state.garage.selectedCar);
  const isRaceStarted = useAppSelector(state => state.garage.isRaceStarted);

  let selectedCarId = selectedCar ? selectedCar.id : null;
  const {startCarEngine, stopCarEngine, engineStatus} = useCarEngineControl();

  const carRef = useRef<HTMLDivElement | null>(null);

  const {
    sendCarDeleteRequest,
    selectCar,

  } = useCarGarageRaceManager();

  useEffect(() => {
    if (carRef.current) {
      setCarRef(carRef.current, car.id, index);
    }
  }, [carRef, car.id, index, setCarRef]);



  return (
    <div className='border-y-2 pt-2 border-gray-300 flex flex-col gap-7'>
      {/*{JSON.stringify(isRaceStarted)}*/}
      engineStatus:{JSON.stringify(engineStatus)}
      <div></div>
      isRaceStarted:{JSON.stringify(isRaceStarted)}
      <div className="flex gap-2">
        <div className='flex gap-2'>
          <div className="buttons-group flex flex-col gap-2">
            <UiButton
              className={selectedCarId === car.id ? 'active' : ''}
              size='sm'
              block
              onClick={() => selectCar(car)}
            >
              select
            </UiButton>

            <UiButton
              onClick={() => sendCarDeleteRequest(+car.id)}
              size='sm'
              block
              theme="danger">
              remove
            </UiButton>
          </div>

          <div className="buttons-group flex flex-col gap-2">
            <UiButton
              disabled={engineStatus || isRaceStarted }
              onClick={() => startCarEngine(car.id, carRef.current!)}
              size='sm'
              block
            >
              start <PlayIcon className="ml-1 size-3"/>
            </UiButton>

            <UiButton
              disabled={engineStatus && isRaceStarted }
              onClick={() => stopCarEngine(car.id, carRef.current!)}
              size='sm'
              block
              theme="danger">
              stop
              <XMarkIcon className="ml-1 size-3"/>
            </UiButton>
          </div>
        </div>

        <p className='text-black font-semibold'>{car.name}</p>
      </div>

      <div className="race-track relative">

        <div ref={carRef} className="car-container inline-block">
          <Car color={car.color}/>
        </div>

        <img src="./src/assets/images/finish.jpg" alt="finish"
             className="CarGarageRaceManager__image-finish absolute top-0 right-0 h-full"/>
      </div>
    </div>
  );
}

export default CarGarageRaceManager;
