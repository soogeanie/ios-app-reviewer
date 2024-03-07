import clsx from 'clsx';

type PaginationPagesProps = {
  currentPage: number;
  lastPage: number;
  pagesToShow: number[];
  onHandlePageNumbers: (page: number) => void;
}

const PaginationPages = ({
  currentPage,
  lastPage,
  pagesToShow,
  onHandlePageNumbers
}: PaginationPagesProps) => {
  const defaultStyles = "inline-flex items-center border-t-2 px-4 pt-4 text-sm font-medium text-gray-500"
  const activeStyles = "border-indigo-500 text-indigo-600"
  const inactiveStyles = "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"

  const showFirstPage = !!pagesToShow.length && pagesToShow[0] !== 1
  const showLastPage = pagesToShow[pagesToShow.length - 1] !== lastPage

  return (
    <div className="hidden md:-mt-px md:flex">
      {showFirstPage &&
      <>
        <a
          href="#"
          className={clsx(defaultStyles, currentPage === 1 ? activeStyles : inactiveStyles)}
          onClick={() => onHandlePageNumbers(1)}
        >
          1
        </a>

        <span className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500">...</span>
      </>
      }

      {!!pagesToShow && pagesToShow.map((page) => (
        <a
          href="#"
          key={page}
          className={clsx(defaultStyles, currentPage === page ? activeStyles : inactiveStyles)}
          onClick={() => onHandlePageNumbers(page)}
        >
          {page}
        </a>
      ))}

      {showLastPage &&
      <>
        <span className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500">...</span>

        <a
          href="#"
          className={clsx(defaultStyles, currentPage === lastPage ? activeStyles : inactiveStyles)}
          onClick={() => onHandlePageNumbers(lastPage)}
        >
          {lastPage}
        </a>
      </>
      }
    </div>
  )
}

export default PaginationPages