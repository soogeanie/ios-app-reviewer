import { DEFAULT_HOUR_LIMIT, LAST_PAGE_RSS } from '../constants';
import { fetchReviews, isWithinHourLimit } from './helpers';
import prisma from '../models/review';

type FetchAppStoreReviewsProps = {
  appId: number;
  page?: number;
}

const BASE_URL = 'https://itunes.apple.com/us/rss/customerreviews/'

export const fetchAppStoreReviews = async ({ appId, page = 1 }: FetchAppStoreReviewsProps) => {
  const appStoreFeedUrl = new URL(`id=${appId}/sortBy=mostRecent/page=${page}/json`, BASE_URL)

  const reviews = await fetchReviews(appStoreFeedUrl.href)

  if (!reviews) return

  const newReviews = await prisma.review.findOrCreateReviews({ appId, reviews })

  if (!newReviews || page === LAST_PAGE_RSS) return

  const lastReviewDate = reviews[reviews.length - 1].updated.label

  if (isWithinHourLimit({ reviewDate: lastReviewDate, hourLimit: DEFAULT_HOUR_LIMIT })) {
    fetchAppStoreReviews({ page: page + 1, appId })
  }
}