import clsx from 'clsx'
import { Review } from './constants'
import ReviewsListItem from './ReviewsListItem'

const ReviewsList = ({ reviews }: { reviews: Review[] }) => {
  return (
    <div className={clsx([reviews && 'border-b border-gray-200', 'pb-6'])}>
      {reviews.map((review, index) => (
        <ReviewsListItem
          key={`${review.id}-${index}`}
          review={review}
          index={index}
        />
      ))}
    </div>
  )
}

export default ReviewsList