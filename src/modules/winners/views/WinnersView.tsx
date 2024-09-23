import {WinnersTable} from "@moduleWinners/components";
import {useLazyGetWinnersQuery} from "@/services/api/controllers/asyncRaceApi/modules/winnerApi";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/store/hooks.ts";
import {clearWinners, setWinners} from "@moduleWinners/store";
import {
  DEFAULT_WINNERS_PER_PAGE,
  INITIAL_WINNERS_PAGE
} from "@/services/api/controllers/asyncRaceApi/modules/winnerApi/WinnersApi.constants.ts";

const WinnersView = () => {
  const [triggerGetWinners, {data: winners}] = useLazyGetWinnersQuery();
  const winnersList = useAppSelector(state => state.winners.winners);
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearWinners());
    };
  }, [dispatch]);


  useEffect(() => {
    triggerGetWinners({
      page: INITIAL_WINNERS_PAGE,
      limit: DEFAULT_WINNERS_PER_PAGE,
      sort: 'id',
      order: 'ASC'
    }).unwrap().then((response) => {
      if (response && winnersList.length === 0) {
        dispatch(setWinners(response));
      }
    });
  }, [winnersList.length, dispatch]);

  return (
    <div className='flex flex-col gap-y-14 min-h-screen'>
      {winners && winnersList.length > 0 ? (<WinnersTable/>) : (<div className='flex justify-center font-extrabold'>
        no winners available
      </div>)}
    </div>
  )
}

export default WinnersView;