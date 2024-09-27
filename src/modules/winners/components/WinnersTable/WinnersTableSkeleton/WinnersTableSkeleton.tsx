import { Car } from '@moduleGarage/components';

function WinnersTableSkeleton() {
  return (
    <div className="flex flex-col gap-y-7 animate-pulse">
      <div className="flex justify-end gap-4">
        <div className="h-10 bg-gray-200 rounded-lg dark:bg-gray-700 w-32" />
        <div className="h-10 bg-gray-200 rounded-lg dark:bg-gray-700 w-32" />
      </div>

      <div className="flex flex-col gap-y-7">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg gap-2">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full" />
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full" />
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full" />
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full" />
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full" />
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-3">
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-10"></div>
                </td>

                <th
                  scope="row"
                  className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <Car color={'#E5E7EB'} />
                </th>

                <td className="px-6 py-4">
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-10"></div>
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-10"></div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-10"></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default WinnersTableSkeleton;
