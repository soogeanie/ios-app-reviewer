import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid';
import { PagesState } from './constants';
import PaginationPages from './PaginationPages';

type PaginationProps = {
  pages: PagesState;
  onHandlePagination: (page: number) => void;
}

const getPageNumbers = (currentPage: number, totalPages: number | null) => {
  if (!totalPages) return []

  const pageNumbers: number[] = []

  let startPage: number
  let endPage: number

  if (currentPage <= 4) {
    startPage = 1
    endPage = 5
  } else if (currentPage + 1 >= totalPages) {
    startPage = totalPages - 4
    endPage = totalPages
  } else {
    startPage = currentPage - 2
    endPage = currentPage + 2
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i)
  }

  return pageNumbers
}

const Pagination = ({ pages, onHandlePagination }: PaginationProps) => {
  const { totalPages, currentPage, prevPage, nextPage } = pages
  const pagesToShow = getPageNumbers(currentPage, totalPages)

  return (
    <nav className="flex items-center justify-between">
      <div className="-mt-px flex w-0 flex-1">
        {prevPage &&
        <a
          href="#"
          className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-pink-300 hover:text-gray-700"
          onClick={() => onHandlePagination(prevPage)}
        >
          <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
          Previous
        </a>
        }
      </div>

      {totalPages &&
        <PaginationPages
          currentPage={currentPage}
          lastPage={totalPages}
          pagesToShow={pagesToShow}
          onHandlePageNumbers={(page) => onHandlePagination(page)}
        />
      }

      <div className="-mt-px flex w-0 flex-1 justify-end">
        {nextPage &&
        <a
          href="#"
          className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-pink-300 hover:text-gray-700"
          onClick={() => onHandlePagination(nextPage)}
        >
          Next
          <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
        </a>
        }
      </div>
    </nav>
  )
}

export default Pagination