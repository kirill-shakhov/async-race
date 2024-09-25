import { setCurrentPage, setStartRace } from '@moduleGarage/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import useFetchAndUpdateCars from '@moduleGarage/hooks/useFetchAndUpdateCars.ts';

const useGarageViewPagination = () => {
  const fetchAndUpdateCars = useFetchAndUpdateCars();
  const dispatch = useAppDispatch();

  const stateTotalCount = useAppSelector((state) => state.garage.totalCount);
  let currentPage = useAppSelector((state) => state.garage.currentPage);

  let pagesCount = Math.ceil(stateTotalCount / 7);

  const handlePageClick = async (page: number): Promise<void> => {
    if (page === currentPage) return;

    dispatch(setStartRace(false));
    dispatch(setCurrentPage(page));
    await fetchAndUpdateCars(page);
  };

  const handlePreviousPage = async (): Promise<void> => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;

      dispatch(setStartRace(false));
      dispatch(setCurrentPage(newPage));
      await fetchAndUpdateCars(newPage);
    }
  };

  const handleNextPage = async (): Promise<void> => {
    if (currentPage < pagesCount) {
      const newPage = currentPage + 1;

      dispatch(setStartRace(false));
      dispatch(setCurrentPage(newPage));
      await fetchAndUpdateCars(newPage);
    }
  };

  return {
    stateTotalCount,
    currentPage,
    pagesCount,

    handlePageClick,
    handleNextPage,
    handlePreviousPage,
  };
};

export default useGarageViewPagination;
