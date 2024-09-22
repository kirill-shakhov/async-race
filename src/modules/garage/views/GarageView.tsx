import {PlayIcon, XMarkIcon} from "@heroicons/react/16/solid";
import useGarageView from "@moduleGarage/views/useGarageView.tsx";
import {useGetCarsQuery} from "@/services/api/controllers/asyncRaceApi/modules/carApi";
import {useAppDispatch, useAppSelector} from "@/store/hooks.ts";
import {setCars, setStartRace, setTotalCount} from "@moduleGarage/store";
import {useEffect, useRef} from "react";

import {UiButton, UiInput, UiPagination} from "@/shared/components";
import {CarGarageRaceManager} from "@moduleGarage/components";
import {useCarEngineControl} from "@moduleGarage/hooks/useCarEngineControl.ts";

const GarageView = () => {
  const {
    createCarValues,
    handleChange,
    handleSubmit,

    handleGenerateCars,
    isLoadingCreatedCars,

    updateCarValues,
    handleUpdateChange,
    handleUpdateSubmit,

    createCarErrors,
    updateCarErrors,
  } = useGarageView();

  const {data: carsWithTotalCount, isLoading} = useGetCarsQuery({page: 1, limit: 7},);
  const {startCarEngine, stopCarEngine} = useCarEngineControl();

  const dispatch = useAppDispatch();
  const stateCars = useAppSelector(state => state.garage.cars);
  const stateTotalCount = useAppSelector(state => state.garage.totalCount);
  const carRefs = useRef<{ [index: number]: { id: number, ref: HTMLElement | null } }>({});
  const isRaceStarted = useAppSelector(state => state.garage.isRaceStarted);

  const setCarRef = (ref: HTMLElement | null, id: number, index: number) => {
    if (ref) {
      carRefs.current[index] = {id, ref};
    }
  };


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


  const race = async () => {
    dispatch(setStartRace(true));

    const promises = Object.keys(carRefs.current).map((index) => {
      const {id, ref} = carRefs.current[+index];
      if (ref) {
        return startCarEngine(id, ref);
      }
      return Promise.resolve();
    });

    try {
      await Promise.allSettled(promises);
      console.log('All cars have started racing!');
    } catch (error) {
      console.error('Error while starting cars:', error);
    }
  };

  const resetRace = async () => {
    dispatch(setStartRace(false));

    const promises = Object.keys(carRefs.current).map((index) => {
      const {id, ref} = carRefs.current[+index];
      if (ref) {
        return stopCarEngine(id, ref);
      }
      return Promise.resolve();
    });

    try {
      await Promise.allSettled(promises);
      console.log('All cars have started racing!');
    } catch (error) {
      console.error('Error while starting cars:', error);
    }
  };


  return (
    <div className="garage-view flex flex-col gap-y-14">

      <div className="garage-view__pannel flex flex-col md:flex-row justify-between flex-wrap md:gap-2">
        <div className="flex gap-2 flex-row">
          <UiButton
            onClick={() => race()}
            disabled={isRaceStarted}
          >
            Race <PlayIcon className="ml-1 size-3"/>
          </UiButton>

          <UiButton onClick={() => resetRace()} theme="danger">
            Reset <XMarkIcon className="ml-1 size-3"/>
          </UiButton>
        </div>

        <div className="forms-group flex flex-col gap-2 md:flex-row flex-wrap">

          <form onSubmit={handleSubmit} className="flex flex-col gap-2 md:flex-row">
            <UiInput
              name="name"
              type="text"
              placeholder="Enter car name"
              value={createCarValues.name}
              onChange={handleChange}
              errors={createCarErrors.name}
            />
            <div>
              <input
                type="color"
                name='color'
                className="p-0.5 h-9 w-9 block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700"
                value={createCarValues.color}
                onChange={handleChange}
                title="Choose your color"
              />
              {createCarErrors.color}
            </div>

            <UiButton
              type="submit"
              disabled={isRaceStarted}
            >Create</UiButton>
          </form>

          <form className="flex flex-col gap-2 md:flex-row" onSubmit={handleUpdateSubmit}>

            <UiInput
              name="name"
              type="text"
              placeholder="Enter car name"
              value={updateCarValues.name}
              onChange={handleUpdateChange}
              errors={updateCarErrors.name}

            />

            <div>
              <input
                type="color"
                name='color'
                className="p-0.5 h-9 w-9 block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700"
                value={updateCarValues.color}
                onChange={handleUpdateChange}
                title="Choose your color"
              />
              {updateCarErrors.color}
            </div>

            <UiButton
              type="submit"
              disabled={isRaceStarted}
            >Update</UiButton>
          </form>
        </div>

        <div className="flex mt-4 md:mt-0">
          <UiButton
            loading={isLoadingCreatedCars}
            block
            disabled={isRaceStarted}
            onClick={handleGenerateCars}>
            Generate Cars
          </UiButton>

        </div>
      </div>

      <div className="garage-view__garage flex flex-col gap-7">
        <h2 className="text-4xl font-bold dark:text-white">Garage [{stateTotalCount}] </h2>

        {isLoading ? (
          <div>Loading...</div>
        ) : stateCars.length > 0 ? (
          stateCars.map((car, index) => (
            <div key={car.id}>
              <CarGarageRaceManager car={car} setCarRef={setCarRef} index={index}/>
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