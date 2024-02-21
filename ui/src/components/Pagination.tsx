import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid';
import { PagesState } from './constants';

type PaginationProps = {
  pages: PagesState;
  onHandlePagination: (page: number) => void;
}

const Pagination = ({ pages, onHandlePagination }: PaginationProps) => {
  const { prev, next } = pages

  return (
    <nav className="flex items-center justify-between">
      <div className="-mt-px flex w-0 flex-1">
        {!!prev &&
        <a
          href="#"
          className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-pink-300 hover:text-gray-700"
          onClick={() => onHandlePagination(prev)}
        >
          <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
          Previous
        </a>
        }
      </div>

      <div className="-mt-px flex w-0 flex-1 justify-end">
        {!!next &&
        <a
          href="#"
          className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-pink-300 hover:text-gray-700"
          onClick={() => onHandlePagination(next)}
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