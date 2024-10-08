import { useCallback } from 'react';
import {
  setTotalCount,
  setWinners,
  setCurrentPage,
} from '@moduleWinners/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { DEFAULT_WINNERS_PER_PAGE } from '@/services/api/controllers/asyncRaceApi/modules/winnerApi/WinnersApi.constants.ts';
import { useLazyGetWinnersQuery } from '@/services/api/controllers/asyncRaceApi/modules/winnerApi';

const useFetchAndUpdateWinners = () => {
  const dispatch = useAppDispatch();
  const [triggerGetWinners, { isLoading }] = useLazyGetWinnersQuery();
  const currentPage = useAppSelector((state) => state.winners.currentPage);
  const sortingDirection = useAppSelector(
    (state) => state.winners.sortingDirection,
  );
  const sortingOption = useAppSelector((state) => state.winners.sortingOption);

  const fetchAndUpdateWinners = useCallback(
    async (page?: number) => {
      try {
        const result = await triggerGetWinners({
          page: page ?? currentPage,
          limit: DEFAULT_WINNERS_PER_PAGE,
          sort: sortingOption,
          order: sortingDirection,
        }).unwrap();

        if (result.winners.length === 0 && currentPage > 1) {
          dispatch(setCurrentPage(currentPage - 1));
          await fetchAndUpdateWinners(currentPage - 1);
          return;
        }

        if (result) {
          const { winners, totalCount } = result;
          dispatch(setWinners(winners));
          dispatch(setTotalCount(totalCount));
        }
      } catch (e) {
        console.error(e);
      }
    },
    [dispatch, triggerGetWinners, currentPage, sortingDirection, sortingOption],
  );

  return { fetchAndUpdateWinners, isLoading };
};

export default useFetchAndUpdateWinners;
