import {UiButton} from "@/shared/components/UI/UiButton";
import {PlayIcon, XMarkIcon} from "@heroicons/react/16/solid";
import CarGarageRaceManager from "@moduleGarage/components/CarGarageRaceManager/CarGarageRaceManager.tsx";

const GarageView = () => {
  return (
    <div className="garage-view flex flex-col gap-y-14">

      <div className="garage-view__pannel flex flex-col md:flex-row justify-between flex-wrap md:gap-2">
        <div className="flex gap-2 flex-row">
          <UiButton>
            Race <PlayIcon className="ml-1 size-3"/>
          </UiButton>

          <UiButton theme="danger">
            Reset <XMarkIcon className="ml-1 size-3"/>
          </UiButton>
        </div>

        <div className="forms-group flex flex-col gap-2 md:flex-row flex-wrap">

          <form className="flex flex-col gap-2 md:flex-row">
            <input type="text" name="carName" placeholder="Type car brand"/>
            <input
              type="color"
              className="p-0.5 h-9 w-9 block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700"
              id="hs-color-input"
              value="#2563eb"
              title="Choose your color"
            />

            <UiButton type="submit">Create</UiButton>
          </form>

          <form className="flex flex-col gap-2 md:flex-row">
            <input type="text" name="carName" placeholder="Type car brand"/>
            <input
              type="color"
              className="p-0.5 h-9 w-9 block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700"
              id="hs-color-input"
              value="#2563eb"
              title="Choose your color"
            />

            <UiButton type="submit">Update</UiButton>
          </form>
        </div>

        <div className="flex mt-4 md:mt-0">
          <UiButton block>
            Generate Cars
          </UiButton>

        </div>
      </div>

      <div className="garage-view__garage flex flex-col gap-7">
        <h2 className="text-4xl font-bold dark:text-white">Garage</h2>


        <CarGarageRaceManager/>
        <CarGarageRaceManager/>
        <CarGarageRaceManager/>

      </div>
    </div>
  )
}

export default GarageView;