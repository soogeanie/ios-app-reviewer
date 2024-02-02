import { StarIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'

const RATINGS = [0, 1, 2, 3, 4]

const StarRating = ({ reviewRating }: { reviewRating: number }) => {
  return (
    <div
      className="flex items-center"
      role="img"
      aria-label={`Rated ${reviewRating} out of 5`}
    >
      {RATINGS.map((rating) => (
        <StarIcon
          key={rating}
          className={clsx(
            reviewRating > rating ? 'text-yellow-400' : 'text-gray-300',
            'h-5 w-5 flex-shrink-0'
          )}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

export default StarRating