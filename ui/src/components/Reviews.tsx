import { useEffect, useReducer, useState } from 'react';
import ReviewsList from './ReviewsList'
import { DEFAULT_PAGES, PagesState, Review, SortParams } from './constants';
import FilterByHours from './FilterByHours';
import SortButton from './SortButton';
import Pagination from './Pagination';

export type ReviewsState = {
  reviews: Review[];
  total: number;
  limit: number;
  pastHours: number;
  sort: SortParams;
  pages: PagesState;
}

const DEFAULT_REVIEWS_STATE: ReviewsState = {
  reviews: [],
  total: 0,
  limit: 20,
  pastHours: 48,
  sort: 'desc',
  pages: DEFAULT_PAGES
}

const ACTIONS = {
  SET_REVIEWS: 'setReviews'
}

// type FetchReviewsProps = Partial<Omit<ReviewsState, 'reviews'>>;
type FetchReviewsProps = Partial<Pick<ReviewsState, 'limit' | 'pastHours' | 'sort'>> & {
  page?: number;
}

const reviewsReducer = (state, action) => {
  switch(action.type) {
    case ACTIONS.SET_REVIEWS: {

      return {
        ...state,
        reviews: [...action.reviews],
        total: action.total,
        pages: action.pages,
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

    const currentPage = options?.page || state.pages.current
    const pastHours = options?.pastHours || state.pastHours
    const sort = options?.sort || state.sort

    try {
      const url = `http://localhost:3000/reviews?page=${currentPage}&pastHours=${pastHours}&sort=${sort}`

      const response = await fetch(url)

      if (!response.ok) throw new Error('Unable to fetch reviews')

      const data = await response.json()

      console.log('data', data)

      dispatch({
        type: ACTIONS.SET_REVIEWS,
        reviews: data.reviews,
        total: data.total,
        pages: data.pages,
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

      <Pagination
        pages={state.pages}
        onHandlePagination={(page) => fetchReviews({ page })}
      />
    </div>
  )
}

export default Reviews