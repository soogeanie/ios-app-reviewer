import { useEffect, useState } from 'react'
import ReviewsListItem from './ReviewsListItem';

export type Review = {
  appId: string;
  id: string;
  userName: string;
  updatedAt: string;
  rating: number;
  title?: string;
  content?: string;
}

const ReviewsList = () => {
  const [isFetchingReviews, setIsFetchingReviews] = useState(false)
  const [error, setError] = useState(null)

  const [reviews, setReviews] = useState<Review[]>([])
  const [offset, setOffset] = useState(0)

  const fetchReviews = async () => {
    setIsFetchingReviews(true)
    setError(null)

    try {
      const response = await fetch(`http://localhost:3000/reviews?offset=${offset}`)

      if (!response.ok) throw new Error('Unable to fetch reviews')

      const data = await response.json()

      setReviews(prevReviews => [...prevReviews, ...data.reviews])
      setOffset(prevOffset => prevOffset + 10)

    } catch (error) {
      setError(error)
    } finally {
      setIsFetchingReviews(false)
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetchingReviews) {
      return;
    }

    fetchReviews()
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [isFetchingReviews])

  return (
    <div className="mx-auto max-w-2xl py-16">
      <h2 className="text-lg font-medium text-gray-900 border-b border-gray-200 pb-6">Customer Reviews</h2>

      <div className="border-b border-gray-200 pb-6">
        {reviews.map((review, index) => (
          <ReviewsListItem
            key={`${review.id}-${index}`}
            review={review}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}

export default ReviewsList