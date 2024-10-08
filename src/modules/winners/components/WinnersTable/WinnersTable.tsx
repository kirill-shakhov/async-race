import { setSortingOption, setSortingOrder } from '@moduleWinners/store';

import { Car } from '@moduleGarage/components';

import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';

import { UiSelect } from '@/shared/components';
import { SortDirection, SortOptions } from '@/shared/types';
import { WinnerWithInfo } from '@moduleWinners/static/types';
interface WinnersTableProps {
  winnersList: WinnerWithInfo[];
}
function WinnersTable({ winnersList }: WinnersTableProps) {
  const sortingDirection = useAppSelector(
    (state) => state.winners.sortingDirection,
  );
  const sortingOption = useAppSelector((state) => state.winners.sortingOption);

  const dispatch = useAppDispatch();

  const sortOptions = [
    { value: 'id', text: 'Sort by ID' },
    { value: 'wins', text: 'Sort by Wins' },
    { value: 'time', text: 'Sort by Time' },
  ];

  const sortOrders = [
    { value: SortDirection.ASC, text: 'Ascending' },
    { value: SortDirection.DESC, text: 'Descending' },
  ];

  const handleSortByOrder = (value: string) => {
    const order = value as SortDirection;
    dispatch(setSortingOrder(order));
  };

  const handleSortByOption = (value: string) => {
    const option = value as SortOptions;
    dispatch(setSortingOption(option));
  };

  return (
    <div className="flex flex-col gap-y-7">
      <div className="flex justify-end gap-4">
        <UiSelect
          list={sortOrders}
          selectedValue={sortingDirection}
          onChange={handleSortByOrder}
        />

        <UiSelect
          list={sortOptions}
          selectedValue={sortingOption}
          onChange={handleSortByOption}
        />
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg gap-2">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Number
              </th>
              <th scope="col" className="px-6 py-3">
                Car
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Wins
              </th>
              <th scope="col" className="px-6 py-3">
                Best time (seconds)
              </th>
            </tr>
          </thead>
          <tbody>
            {winnersList.map((winner) => (
              <tr
                key={winner.id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="w-4 p-4">
                  <div className="flex items-center">{winner.id}</div>
                </td>

                <th
                  scope="row"
                  className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <Car color={winner.color} />
                </th>

                <td className="px-6 py-4">{winner.name}</td>

                <td className="px-6 py-4">
                  <div className="flex items-center">{winner.wins}</div>
                </td>
                <td className="px-6 py-4">
                  <p>{winner.time}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default WinnersTable;
