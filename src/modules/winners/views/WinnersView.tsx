import { WinnersTable, WinnersTableSkeleton } from '@moduleWinners/components';
import { useEffect, useState } from 'react';
import { clearWinners } from '@moduleWinners/store';
import useWinnersViewPagination from '@moduleWinners/hooks/useWinnersViewPagination.ts';
import useFetchAndUpdateWinners from '@moduleWinners/hooks/useFetchAndUpdateWinners.ts';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { useLazyGetCarQuery } from '@/services/api/controllers/asyncRaceApi/modules/carApi';
import { UiPagination } from '@/shared/components';
import { WinnerWithInfo } from '@moduleWinners/static/types';

function WinnersView() {
  const [triggerGetCar] = useLazyGetCarQuery();
  const winnersList = useAppSelector((state) => state.winners.winners);

  const { fetchAndUpdateWinners, isLoading } = useFetchAndUpdateWinners();
  const [winnersWithInfo, setWinnersWithInfo] = useState<WinnerWithInfo[]>([]);
  const [isFetchingWinnerInfo, setIsFetchingWinnerInfo] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearWinners());
    };
  }, [dispatch]);

  useEffect(() => {
    fetchAndUpdateWinners();
  }, [fetchAndUpdateWinners]);

  useEffect(() => {
    const getInfoWinnerFromWinnersList = async () => {
      if (!winnersList || winnersList.length === 0) {
        setWinnersWithInfo([]);
        return;
      }

      setIsFetchingWinnerInfo(true);
      try {
        const promises = winnersList.map(async (winner) => {
          const result = await triggerGetCar(winner.id).unwrap();
          return {
            ...winner,
            name: result.name,
            color: result.color,
          };
        });

        const updatedWinners = await Promise.all(promises);
        setWinnersWithInfo(updatedWinners);
      } catch (error) {
        console.error('Error fetching winner info:', error);
      } finally {
        setIsFetchingWinnerInfo(false);
      }
    };

    getInfoWinnerFromWinnersList();
  }, [winnersList, triggerGetCar]);

  const {
    currentPage,
    pagesCount,

    handlePageClick,
    handleNextPage,
    handlePreviousPage,
  } = useWinnersViewPagination();

  return (
    <div className="flex flex-col gap-y-14">
      {isLoading || isFetchingWinnerInfo ? (
        <WinnersTableSkeleton />
      ) : winnersList && winnersList.length > 0 ? (
        <WinnersTable winnersList={winnersWithInfo} />
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
