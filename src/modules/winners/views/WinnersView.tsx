import { WinnersTable, WinnersTableSkeleton } from '@moduleWinners/components';
import { useEffect } from 'react';
import { clearWinners } from '@moduleWinners/store';
import useWinnersViewPagination from '@moduleWinners/hooks/useWinnersViewPagination.ts';
import useFetchAndUpdateWinners from '@moduleWinners/hooks/useFetchAndUpdateWinners.ts';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { UiPagination } from '@/shared/components';

function WinnersView() {
  const winnersList = useAppSelector((state) => state.winners.winners);
  const { fetchAndUpdateWinners, isLoading } = useFetchAndUpdateWinners();

  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearWinners());
    };
  }, [dispatch]);

  useEffect(() => {
    fetchAndUpdateWinners();
  }, [fetchAndUpdateWinners]);

  const {
    currentPage,
    pagesCount,

    handlePageClick,
    handleNextPage,
    handlePreviousPage,
  } = useWinnersViewPagination();

  return (
    <div className="flex flex-col gap-y-14">
      {isLoading ? (
        <WinnersTableSkeleton />
      ) : winnersList && winnersList.length > 0 ? (
        <WinnersTable />
      ) : (
        <div className="flex justify-center font-extrabold">
          No winners available
        </div>
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
    </div>
  );
}

export default WinnersView;
