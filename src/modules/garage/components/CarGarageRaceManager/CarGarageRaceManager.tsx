import {UiButton} from "@/shared/components/UI/UiButton";
import {PlayIcon, XMarkIcon} from "@heroicons/react/16/solid";
import Car from "@moduleGarage/components/Car/Car.tsx";

const CarGarageRaceManager = () => {
  return (
    <div className='border-y-2 pt-2 border-gray-300 flex flex-col gap-7'>
      <div className='flex gap-2'>
        <div className="buttons-group flex flex-col gap-2">
          <UiButton
            size='sm'
            outlined
            block
          >
            select
          </UiButton>

          <UiButton
            size='sm'
            block
            theme="danger">
            remove
          </UiButton>
        </div>
        <div className="buttons-group flex flex-col gap-2">
          <UiButton
            size='sm'
            block
          >
            start <PlayIcon className="ml-1 size-3"/>
          </UiButton>

          <UiButton
            size='sm'
            block
            theme="danger">
            stop

            <XMarkIcon className="ml-1 size-3"/>
          </UiButton>
        </div>
      </div>

      <div className="race-track relative">
        <Car color={'#ff0000'}/>

          <img src="./src/assets/images/finish.jpg" alt="finish" className="CarGarageRaceManager__image-finish  absolute top-0 right-0  h-full"/>
        </div>
    </div>
  )
}

export default CarGarageRaceManager;