import {useAppDispatch, useAppSelector} from "@/store/hooks.ts";
import {useGetCarsQuery} from "@/services/api/controllers/asyncRaceApi/modules/carApi";
import {setCars, setTotalCount, setCurrentPage, clearCars} from "@moduleGarage/store";

const useUiPagination = () => {
  const dispatch = useAppDispatch();

  let currentPage = useAppSelector(state => state.garage.currentPage);
  let stateTotalCount = useAppSelector(state => state.garage.totalCount);

  const {refetch} = useGetCarsQuery({page: currentPage, limit: 7});

  let pagesCount = Math.ceil(stateTotalCount / 7);


  const getNewCarsList = async (page: number) => {
    try {
      await dispatch(clearCars());
      const refetchResponse = await refetch({page});

      if (refetchResponse.data) {
        const {cars, totalCount} = refetchResponse.data;
        dispatch(setCars(cars));
        dispatch(setTotalCount(totalCount));
      }
    } catch (e) {
      console.error(e);
    }
  }

  const handlePageClick = async (page: number): Promise<void> => {
    if (page === currentPage) return;

    dispatch(setCurrentPage(page));
    await getNewCarsList(page);
  };

  const handlePreviousPage = async (): Promise<void> => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      dispatch(setCurrentPage(newPage));
      await getNewCarsList(newPage);
    }
  };

  const handleNextPage = async (): Promise<void> => {
    if (currentPage < pagesCount) {
      const newPage = currentPage + 1;
      dispatch(setCurrentPage(newPage));
      await getNewCarsList(newPage);
    }
  };

  return {
    pagesCount,
    currentPage,
    handlePageClick,
    handlePreviousPage,
    handleNextPage
  }
}

export default useUiPagination;