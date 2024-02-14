import clsx from 'clsx';
import { Review } from './constants'
import StarRating from './StarRating';

type ReviewProps = {
  review: Review;
  index: number;
}

const ReviewsListItem = ({ review, index }: ReviewProps) => {
  const formatToLocalDateTime = (dateTime: string) => {
    const formatting = new Date(dateTime)
    return formatting.toLocaleString()
  }

  return (
  <div className={clsx(!!index && 'border-t border-gray-200 py-10', 'flex flex-col gap-y-8 py-10')}>
    <div>
      <h3 className="font-medium text-gray-900">{review.userName}</h3>

      <time
        dateTime={formatToLocalDateTime(review.updatedAt)}
        className="text-sm text-gray-500 mt-2"
      >
        {formatToLocalDateTime(review.updatedAt)}
      </time>
    </div>

    <StarRating reviewRating={review.rating} />

    <div className="space-y-2">
      <h4 className="text-sm font-medium text-gray-900">{review.title}</h4>

      <p className="text-sm text-gray-600">{review.content}</p>
    </div>
  </div>
  )
}

export default ReviewsListItem