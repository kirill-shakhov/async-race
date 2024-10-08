import { useEffect, useRef, useState } from 'react';
import { PlayIcon, XMarkIcon } from '@heroicons/react/16/solid';

import { toast } from 'react-toastify';
import {
  clearRaceResult,
  setCars,
  setStartRace,
  setTotalCount,
} from '@moduleGarage/store';
import { CarGarageRaceManager, FormControl } from '@moduleGarage/components';
import { useCarEngineControl } from '@moduleGarage/hooks/useCarEngineControl.ts';

import useGarageView from '@moduleGarage/views/useGarageView.tsx';
import useGarageViewPagination from '@moduleGarage/hooks/useGarageViewPagination.ts';

import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import {
  useCreateWinnerMutation,
  useLazyGetWinnerQuery,
  useUpdateWinnerMutation,
} from '@/services/api/controllers/asyncRaceApi/modules/winnerApi';
import { useGetCarsQuery } from '@/services/api/controllers/asyncRaceApi/modules/carApi';

import {
  UiButton,
  UiButtonTheme,
  UiModal,
  UiPagination,
} from '@/shared/components';
import {
  DEFAULT_GARAGE_CARS_PER_PAGE,
  INITIAL_GARAGE_PAGE,
} from '@/services/api/controllers/asyncRaceApi/modules/carApi/CarApi.constants.ts';

function GarageView() {
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

  const { data: carsWithTotalCount, isLoading } = useGetCarsQuery({
    page: INITIAL_GARAGE_PAGE,
    limit: DEFAULT_GARAGE_CARS_PER_PAGE,
  });
  const [triggerGetWinner] = useLazyGetWinnerQuery();
  const [updateWinner] = useUpdateWinnerMutation();
  const [createWinner] = useCreateWinnerMutation();
  const { startCarEngine, stopCarEngine } = useCarEngineControl();

  const dispatch = useAppDispatch();
  const stateCars = useAppSelector((state) => state.garage.cars);
  const carRefs = useRef<{
    [index: number]: { id: number; ref: HTMLElement | null };
  }>({});

  const isRaceStarted = useAppSelector((state) => state.garage.isRaceStarted);
  const raceResult = useAppSelector((state) => state.garage.raceResult);

  const [isRaceFinished, setIsRaceFinished] = useState(false);
  const [raceWinner, setRaceWinner] = useState<{
    name: string;
    time: number;
  } | null>(null);

  const {
    stateTotalCount,
    currentPage,
    pagesCount,

    handlePageClick,
    handleNextPage,
    handlePreviousPage,
  } = useGarageViewPagination();

  const setCarRef = (ref: HTMLElement | null, id: number, index: number) => {
    if (ref) {
      carRefs.current[index] = { id, ref };
    }
  };

  useEffect(() => {
    toast.info(
      'Please be aware that there might be a slight delay in processing requests at the start of the application.',
    );
  }, []);

  useEffect(() => {
    return () => {
      dispatch(setStartRace(false));
      dispatch(clearRaceResult());
    };
  }, [dispatch]);

  useEffect(() => {
    if (carsWithTotalCount && stateCars?.length === 0) {
      dispatch(setCars(carsWithTotalCount.cars));
    }
  }, [carsWithTotalCount, stateCars?.length, dispatch]);

  useEffect(() => {
    if (
      carsWithTotalCount?.totalCount &&
      carsWithTotalCount?.totalCount !== 0
    ) {
      dispatch(setTotalCount(carsWithTotalCount?.totalCount));
    }
  }, [carsWithTotalCount, dispatch]);

  const startRace = async () => {
    const promises = Object.keys(carRefs.current).map((index) => {
      const { id, ref } = carRefs.current[+index];
      if (ref) {
        return startCarEngine(id, ref);
      }
      return Promise.resolve();
    });

    try {
      await Promise.allSettled(promises);
      setIsRaceFinished(true);
    } catch (error) {
      console.error('Error while starting cars:', error);
    }
  };

  const race = () => {
    dispatch(setStartRace(true));
    toast.success('The race has begun! Get ready for the thrill');
  };

  useEffect(() => {
    if (isRaceStarted) {
      startRace()
        .then(() => {
          toast.success('Race completed!');
        })
        .catch((error) => {
          toast.error('Error during the race:', error);
        });
    }
  }, [isRaceStarted]);

  useEffect(() => {
    if (isRaceFinished && raceResult.length > 0) {
      // We choose the winner not based on the fastest time, but on the order in which cars are added to the raceResult array.
      // This is because the cars do not start at the same time: each car starts its movement once the server responds
      // to its request, and the response time can vary. Therefore, the time recorded in the results may not accurately
      // reflect the true order of finishing. The results are added to raceResult as the animations complete, so the
      // first car added is considered the actual winner, as it finished its animation first.

      const winner = raceResult[0]; // We treat the first car added as the actual winner
      const car = stateCars?.find((car) => car.id === winner.id);

      if (car) {
        setRaceWinner({
          name: car.name,
          time: winner.time,
        });
      }

      triggerGetWinner(winner.id)
        .unwrap()
        .then((data) => {
          updateWinner({
            id: data.id,
            time: Math.min(data.time, winner.time),
            wins: data.wins + 1,
          })
            .unwrap()
            .then(() => {
              toast.success('Winner updated successfully');
            })
            .catch((updateError) => {
              toast.error('Error updating winner:', updateError);
            });
        })
        .catch((error) => {
          if (error.status === 404) {
            toast.error(
              'Winner not found in the database, creating new winner...',
            );
            createWinner({
              id: winner.id,
              time: winner.time,
              wins: 1,
            })
              .unwrap()
              .then(() => {
                toast.success('Winner created successfully');
              })
              .catch((createError) => {
                console.error('Error creating winner:', createError);
              });
          } else {
            console.error('Error fetching winner data:', error);
          }
        });
    }
  }, [
    isRaceFinished,
    raceResult,
    triggerGetWinner,
    createWinner,
    updateWinner,
  ]);

  const resetRace = async () => {
    dispatch(setStartRace(false));
    dispatch(clearRaceResult());

    setIsRaceFinished(false);
    setRaceWinner(null);

    const promises = Object.keys(carRefs.current).map((index) => {
      const { id, ref } = carRefs.current[+index];
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
      <div className="garage-view__pannel flex flex-col md:flex-row justify-between flex-wrap gap-4">
        <div className="flex gap-2 flex-row">
          <UiButton
            onClick={() => race()}
            disabled={isRaceStarted}
            className="max-h-[40px]"
          >
            Race <PlayIcon className="ml-1 size-3" />
          </UiButton>

          <UiButton
            onClick={() => resetRace()}
            disabled={!isRaceStarted}
            className="max-h-[40px]"
            theme={UiButtonTheme.DANGER}
          >
            Reset <XMarkIcon className="ml-1 size-3" />
          </UiButton>
        </div>

        <div className="forms-group flex flex-col gap-4 md:flex-row flex-wrap">
          <FormControl
            onSubmit={handleSubmit}
            onChange={handleChange}
            values={createCarValues}
            errors={createCarErrors}
            disabled={isRaceStarted}
            submitButtonText="create"
          />

          <FormControl
            onSubmit={handleUpdateSubmit}
            onChange={handleUpdateChange}
            values={updateCarValues}
            errors={updateCarErrors}
            disabled={isRaceStarted}
            submitButtonText="update"
          />
        </div>

        <div className="flex mt-4 md:mt-0">
          <UiButton
            loading={isLoadingCreatedCars}
            block
            disabled={isRaceStarted}
            onClick={handleGenerateCars}
            className="max-h-[40px]"
          >
            Generate Cars
          </UiButton>
        </div>
      </div>

      <div className="garage-view__garage flex flex-col gap-7">
        <h2 className="text-4xl font-bold dark:text-white">
          Garage [{stateTotalCount}]{' '}
        </h2>

        {isLoading ? (
          <div>Loading...</div>
        ) : stateCars && stateCars?.length > 0 ? (
          stateCars.map((car, index) => (
            <div key={car.id}>
              <CarGarageRaceManager
                car={car}
                setCarRef={setCarRef}
                index={index}
              />
            </div>
          ))
        ) : (
          <div>No cars available</div>
        )}

        <div className="flex justify-end">
          <UiPagination
            pagesCount={pagesCount}
            currentPage={currentPage}
            handlePageClick={handlePageClick}
            handlePreviousPage={handlePreviousPage}
            handleNextPage={handleNextPage}
          />
        </div>

        {raceWinner && (
          <UiModal isOpen={isRaceFinished} setIsOpen={setIsRaceFinished}>
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <p className="text-4xl font-extrabold dark:text-white">
                {raceWinner.name} went first ({raceWinner.time}s)!
              </p>
            </div>
          </UiModal>
        )}
      </div>
    </div>
  );
}

export default GarageView;
