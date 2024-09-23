import {Car} from "@moduleGarage/components";

const WinnersTable = () => {
  return (


    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td className="w-4 p-4">
            <div className="flex items-center">
              text
            </div>
          </td>

          <th scope="row"
              className="flex items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            <Car color={'#000'}/>
          </th>

          <td className="px-6 py-4">
            car name
          </td>

          <td className="px-6 py-4">
            <div className="flex items-center">
              number
            </div>
          </td>
          <td className="px-6 py-4">
            <p >
              number
            </p>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  )
}

export default WinnersTable;