import {useCallback} from 'react';
import {useAppDispatch, useAppSelector} from '@/store/hooks.ts';
import {clearCars, setCars, setCurrentPage, setTotalCount} from '@moduleGarage/store';
import {useLazyGetCarsQuery} from '@/services/api/controllers/asyncRaceApi/modules/carApi';
import {DEFAULT_GARAGE_CARS_PER_PAGE} from "@/services/api/controllers/asyncRaceApi/modules/carApi/CarApi.constants.ts";

const useFetchAndUpdateCars = () => {
  const dispatch = useAppDispatch();
  const [triggerGetCarsQuery] = useLazyGetCarsQuery();

  const currentPage = useAppSelector(state => state.garage.currentPage);

  const fetchAndUpdateCars = useCallback(async (page?: number) => {
    try {
      dispatch(clearCars());
      const result = await triggerGetCarsQuery({
        page: page ?? currentPage,
        limit: DEFAULT_GARAGE_CARS_PER_PAGE,
      }).unwrap();

      if (result.cars.length === 0 && currentPage > 1) {
        dispatch(setCurrentPage(currentPage - 1));
        await fetchAndUpdateCars(currentPage - 1);
        return;
      }
      if (result) {
        const {cars, totalCount} = result;
        dispatch(setCars(cars));
        dispatch(setTotalCount(totalCount));
      }


    } catch (e) {
      console.error(e);
    }
  }, [dispatch, currentPage]);

  return fetchAndUpdateCars;
};

export default useFetchAndUpdateCars;
