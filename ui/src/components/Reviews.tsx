import { useEffect, useReducer, useState } from 'react';
import ReviewsList from './ReviewsList'
import { Review, SortParams } from './constants';
import FilterByHours from './FilterByHours';
import SortButton from './SortButton';

type ReviewsState = {
  reviews: Review[];
  page: number;
  pastHours: number;
  sort: SortParams;
}

const DEFAULT_REVIEWS_STATE: ReviewsState = {
  reviews: [],
  page: 1,
  pastHours: 48,
  sort: 'desc'
}

const ACTIONS = {
  SET_REVIEWS: 'setReviews'
}

type FetchReviewsProps = Partial<Omit<ReviewsState, 'reviews'>>;

const reviewsReducer = (state, action) => {
  switch(action.type) {
    case ACTIONS.SET_REVIEWS: {
      const updatedReviews = state.page === action.page || state.sort !== action.sort
        ? [...action.reviews]
        : [...state.reviews, ...action.reviews]

      return {
        ...state,
        reviews: updatedReviews,
        page: action.page,
        sort: action.sort,
        pastHours: action.pastHours
      }
    }
  }

  throw Error('Unknown action: ' + action.type)
}

const Reviews = () => {
  const [state, dispatch] = useReducer(reviewsReducer, DEFAULT_REVIEWS_STATE)

  const [isFetchingReviews, setIsFetchingReviews] = useState(false)
  const [error, setError] = useState(null)

  const fetchReviews = async (options?: FetchReviewsProps) => {
    setIsFetchingReviews(true)
    setError(null)

    const page = options?.page || 1
    const pastHours = options?.pastHours || state.pastHours
    const sort = options?.sort || state.sort

    try {
      const url = `http://localhost:3000/reviews?page=${page}&pastHours=${pastHours}&sort=${sort}`

      const response = await fetch(url)

      if (!response.ok) throw new Error('Unable to fetch reviews')

      const data = await response.json()

      dispatch({
        type: ACTIONS.SET_REVIEWS,
        reviews: data.reviews,
        page,
        pastHours,
        sort
      })
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

    fetchReviews({ page: state.page + 1})
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [isFetchingReviews])

  return (
    <div className="mx-auto max-w-2xl py-16">
      <div className="border-b border-gray-200 pb-6 flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">Customer Reviews</h2>

        <div className="flex gap-x-4">
          <FilterByHours pastHours={state.pastHours} onPastHoursChange={(pastHours) => fetchReviews({ pastHours })} />

          <SortButton sort={state.sort} onSortButtonClick={(sort) => fetchReviews({ sort })}/>
        </div>
      </div>

      <ReviewsList reviews={state.reviews} />
    </div>
  )
}

export default Reviews