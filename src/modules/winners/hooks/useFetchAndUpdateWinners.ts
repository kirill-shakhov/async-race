import {useCallback} from 'react';
import {useAppDispatch, useAppSelector} from '@/store/hooks.ts';
import {setTotalCount} from '@moduleWinners/store';
import {
  DEFAULT_WINNERS_PER_PAGE,
} from "@/services/api/controllers/asyncRaceApi/modules/winnerApi/WinnersApi.constants.ts";
import {useLazyGetWinnersQuery} from "@/services/api/controllers/asyncRaceApi/modules/winnerApi";
import {setWinners} from "@moduleWinners/store";

const useFetchAndUpdateWinners = () => {
  const dispatch = useAppDispatch();
  const [triggerGetWinners, {data: winners, isLoading}] = useLazyGetWinnersQuery();
  const currentPage = useAppSelector(state => state.winners.currentPage);
  const sortingDirection = useAppSelector(state => state.winners.sortingDirection);
  const sortingOption = useAppSelector(state => state.winners.sortingOption);

  const fetchAndUpdateWinners = useCallback(async (page?: number) => {
    try {
      const result = await triggerGetWinners({
        page: page ?? currentPage,
        limit: DEFAULT_WINNERS_PER_PAGE,
        sort: sortingOption,
        order: sortingDirection
      }).unwrap();

      if (result) {
        const {winners, totalCount} = result;
        dispatch(setWinners(winners));
        dispatch(setTotalCount(totalCount));
      }
    } catch (e) {
      console.error(e);
    }
  }, [dispatch, triggerGetWinners, currentPage, sortingDirection, sortingOption]);

  return {fetchAndUpdateWinners, isLoading};
};

export default useFetchAndUpdateWinners;
