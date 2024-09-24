import {useAppDispatch, useAppSelector} from "@/store/hooks.ts";
import useFetchAndUpdateWinners from "@moduleWinners/hooks/useFetchAndUpdateWinners.ts";
import {setCurrentPage} from "@moduleWinners/store";
import {
  DEFAULT_WINNERS_PER_PAGE,
} from "@/services/api/controllers/asyncRaceApi/modules/winnerApi/WinnersApi.constants.ts";

const useWinnersViewPagination = () => {
  const {fetchAndUpdateWinners} = useFetchAndUpdateWinners();
  const dispatch = useAppDispatch();

  const stateTotalCount = useAppSelector(state => state.winners.totalCount);
  let currentPage = useAppSelector(state => state.winners.currentPage);
  let pagesCount = Math.ceil(stateTotalCount / DEFAULT_WINNERS_PER_PAGE);

  const handlePageClick = async (page: number): Promise<void> => {
    if (page === currentPage) return;

    dispatch(setCurrentPage(page));
    await fetchAndUpdateWinners(page);
  };

  const handlePreviousPage = async (): Promise<void> => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;

      dispatch(setCurrentPage(newPage));
      await fetchAndUpdateWinners(newPage);
    }
  };

  const handleNextPage = async (): Promise<void> => {
    if (currentPage < pagesCount) {
      const newPage = currentPage + 1;

      dispatch(setCurrentPage(newPage));
      await fetchAndUpdateWinners(newPage);
    }
  };

  return {
    stateTotalCount,
    currentPage,
    pagesCount,

    handlePageClick,
    handleNextPage,
    handlePreviousPage
  }
}


export default useWinnersViewPagination;