import {UiButton} from "@/shared/components/UI/UiButton";
import {PlayIcon, XMarkIcon} from "@heroicons/react/16/solid";

const GarageView = () => {
  return (
    <div className="garage-view">
      <div className='flex gap-2'>
        <UiButton>
          Race <PlayIcon className="ml-1 size-3"/>
        </UiButton>

        <UiButton
          theme='danger'
        >
          Reset
          <XMarkIcon className="ml-1 size-3"/>
        </UiButton>
      </div>


    </div>
  )
}

export default GarageView;