// import {useAppDispatch, useAppSelector} from "@/store/hooks.ts";
// import {useGetCarsQuery} from "@/services/api/controllers/asyncRaceApi/modules/carApi";
// import {setCars, setTotalCount, setCurrentPage, clearCars, setStartRace} from "@moduleGarage/store";
// import useFetchAndUpdateCars from "@moduleGarage/hooks/useFetchAndUpdateCars.ts";
//
// const useUiPagination = () => {
//   const dispatch = useAppDispatch();
//   const fetchAndUpdateCars = useFetchAndUpdateCars();
//
//   let currentPage = useAppSelector(state => state.garage.currentPage);
//   let stateTotalCount = useAppSelector(state => state.garage.totalCount);
//
//   const {refetch} = useGetCarsQuery({page: currentPage, limit: 7});
//
//   let pagesCount = Math.ceil(stateTotalCount / 7);
//
//   const handlePageClick = async (page: number): Promise<void> => {
//     if (page === currentPage) return;
//
//     dispatch(setStartRace(false));
//     dispatch(setCurrentPage(page));
//     await fetchAndUpdateCars(page);
//   };
//
//   const handlePreviousPage = async (): Promise<void> => {
//     if (currentPage > 1) {
//       const newPage = currentPage - 1;
//
//       dispatch(setStartRace(false));
//       dispatch(setCurrentPage(newPage));
//       await fetchAndUpdateCars(newPage);
//     }
//   };
//
//   const handleNextPage = async (): Promise<void> => {
//     if (currentPage < pagesCount) {
//       const newPage = currentPage + 1;
//
//       dispatch(setStartRace(false));
//       dispatch(setCurrentPage(newPage));
//       await fetchAndUpdateCars(newPage);
//     }
//   };
//
//   return {
//     pagesCount,
//     currentPage,
//     handlePageClick,
//     handlePreviousPage,
//     handleNextPage
//   }
// }
//
// export default useUiPagination;