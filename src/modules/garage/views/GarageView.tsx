import {UiButton} from "@/shared/components/UI/UiButton";
import {PlayIcon, XMarkIcon} from "@heroicons/react/16/solid";
import CarGarageRaceManager from "@moduleGarage/components/CarGarageRaceManager/CarGarageRaceManager.tsx";
import useGarageView from "@moduleGarage/views/useGarageView.tsx";
import {useGetCarsQuery} from "@/services/api/controllers/asyncRaceApi/modules/carApi";
import {useAppDispatch, useAppSelector} from "@/store/hooks.ts";
import {setCars, setTotalCount} from "@moduleGarage/store";
import {useEffect} from "react";
import UiPagination from "@/shared/components/UI/UiPagination/UiPagination.tsx";

const GarageView = () => {
  const {
    handleGenerateCars,
    isLoadingCreatedCars
  } = useGarageView();

  const {data: carsWithTotalCount, isLoading} = useGetCarsQuery({page: 1, limit: 7},);

  const dispatch = useAppDispatch();
  const stateCars = useAppSelector(state => state.garage.cars);
  const stateTotalCount = useAppSelector(state => state.garage.totalCount);

  useEffect(() => {
    if (carsWithTotalCount && stateCars.length === 0) {
      dispatch(setCars(carsWithTotalCount.cars));
    }
  }, [carsWithTotalCount?.cars, stateCars?.length, dispatch])

  useEffect(() => {
    if (carsWithTotalCount?.totalCount !== 0) {
      dispatch(setTotalCount(carsWithTotalCount?.totalCount))
    }
  }, [carsWithTotalCount?.totalCount, dispatch]);

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
          <UiButton loading={isLoadingCreatedCars} block onClick={handleGenerateCars}>
            Generate Cars
          </UiButton>

        </div>
      </div>

      <div className="garage-view__garage flex flex-col gap-7">
        <h2 className="text-4xl font-bold dark:text-white">Garage [{stateTotalCount}] </h2>

        {isLoading ? (
          <div>Loading...</div>
        ) : stateCars.length > 0 ? (
          stateCars.map((car) => (
            <div key={car.id}>
              <CarGarageRaceManager car={car}/>
            </div>
          ))
        ) : (
          <div>No cars available</div>
        )}

        <div className="flex justify-end">
          <UiPagination/>
        </div>
      </div>
    </div>
  )
}

export default GarageView;