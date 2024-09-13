import {ArrowLeftIcon, ArrowRightIcon} from "@heroicons/react/16/solid";
import useUiPagination from "@/shared/components/UI/UiPagination/useUiPagination.tsx";

const UiPagination = () => {
  const {
    pagesCount,
    currentPage,
    handlePageClick,
    handlePreviousPage,
    handleNextPage
  } = useUiPagination();

  return (
    <nav aria-label="Page navigation example">
      {currentPage}
      <ul className="flex items-center -space-x-px h-8 text-sm">
        <li>
          <a
            onClick={handlePreviousPage}
            className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Previous</span>
            <ArrowLeftIcon className='ml-1 size-3'/>
          </a>
        </li>
        {Array.from({length: pagesCount}, (_, i) => i + 1).map((page) => (
          <li key={page}>
            <button
              onClick={() => handlePageClick(page)}
              aria-current={page === currentPage ? "page" : undefined}
              className={`flex items-center justify-center px-3 h-8 leading-tight ${
                page === currentPage
                  ? "text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                  : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              }`}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <a
            onClick={handleNextPage}
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Next</span>
            <ArrowRightIcon className='ml-1 size-3'/>
          </a>
        </li>
      </ul>
    </nav>)
}

export default UiPagination;