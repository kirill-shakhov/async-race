import {useAppDispatch, useAppSelector} from "@/store/hooks.ts";
import {useState} from "react";
import {useGetCarsQuery} from "@/services/api/controllers/asyncRaceApi/modules/carApi";
import {setCars, setTotalCount, clearCars} from "@moduleGarage/store";

const useUiPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const {refetch} = useGetCarsQuery({page: currentPage, limit: 7});
  const dispatch = useAppDispatch();

  let stateTotalCount = useAppSelector(state => state.garage.totalCount);
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

    setCurrentPage(page);
    await getNewCarsList(page);
  };

  const handlePreviousPage = async (): Promise<void> => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      await getNewCarsList(newPage);
    }
  };

  const handleNextPage = async (): Promise<void> => {
    if (currentPage < pagesCount) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
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