import { DEFAULT_HOUR_LIMIT, LAST_PAGE_RSS } from '../constants';
import { getPastDateTime } from '../helpers';
import { findOrCreateReviews } from '../models/review';

type FetchAppStoreReviewsProps = {
  appId: number;
  page?: number;
}

export type AppStoreFeedReview = {
  id: { label: string; };
  author: { name: { label: string; } };
  updated: { label: string; };
  "im:rating": { label: string; };
  title?: { label: string; };
  content?: { label: string; };
}

const BASE_URL = 'https://itunes.apple.com/us/rss/customerreviews/'

const fetchReviews = async (url: string) => {
  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Network response was not OK. ${response.statusText}`)
    }

    const results = await response.json()
  
    return results.feed.entry
  } catch (error) {
    console.error(error)
  }
}

const isPastHourLimit = ({ reviewDate, hourLimit }: { reviewDate: Date; hourLimit: number }) => {
  const past = getPastDateTime(hourLimit)
  const dateToCompare = new Date(reviewDate)

  if (dateToCompare < past) return true

  return false
}

export const fetchAppStoreReviews = async ({ appId, page = 1 }: FetchAppStoreReviewsProps) => {
  console.log(`fetchAppStoreReviews is running page ${page} - timestamp: ${new Date()}`)

  const appStoreFeedUrl = new URL(`id=${appId}/sortBy=mostRecent/page=${page}/json`, BASE_URL)

  const reviews = await fetchReviews(appStoreFeedUrl.href)

  if (!reviews) return

  const newReviews = await findOrCreateReviews({ appId, reviews })

  if (!newReviews || page === LAST_PAGE_RSS) return

  const lastReviewDate = reviews[reviews.length - 1].updated.label

  if (!isPastHourLimit({ reviewDate: lastReviewDate, hourLimit: DEFAULT_HOUR_LIMIT })) {
    fetchAppStoreReviews({ page: page + 1, appId })
  }
}