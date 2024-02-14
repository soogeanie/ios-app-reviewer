import { BarsArrowDownIcon, BarsArrowUpIcon } from '@heroicons/react/20/solid'
import { SortParams } from './constants'

type SortButtonProps = {
  sort: SortParams;
  onSortButtonClick: (sort: SortParams) => void;
}

const SortButton = ({ sort, onSortButtonClick }: SortButtonProps) => {
  const sortIconClasses = '-ml-0.5 h-5 w-5 text-gray-400'

  return (
    <button
      type="button"
      className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      onClick={() => onSortButtonClick(sort === 'desc' ? 'asc' : 'desc')}
    >
      {sort === 'desc' ?
        <BarsArrowDownIcon className={sortIconClasses} aria-hidden="true" />
      :
        <BarsArrowUpIcon className={sortIconClasses} aria-hidden="true" />
      }
      Sort
    </button>
  )
}

export default SortButton