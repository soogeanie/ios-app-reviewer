import { PrismaClient } from '@prisma/client'
import https from 'node:https'

const prisma = new PrismaClient()

type FetchAppStoreReviewsProps = {
  appId: number;
  page?: number;
}

type AppStoreFeedUrlProps = FetchAppStoreReviewsProps & {
  page: number;
}

type AppStoreFeedReview = {
  id: { label: string; };
  author: { name: { label: string; } };
  updated: { label: string; };
  "im:rating": { label: string; };
  title?: { label: string; };
  content?: { label: string; };
}

const BASE_URL = 'https://itunes.apple.com/us/rss/customerreviews/'
const DEFAULT_PAGE = 1
const DEFAULT_HOUR_LIMIT = 48

let currentPage = DEFAULT_PAGE

const buildAppStoreFeedUrl = ({ appId, page }: AppStoreFeedUrlProps) => {
  const { href } = new URL(`id=${appId}/sortBy=mostRecent/page=${page}/json`, BASE_URL)

  return href
}

// should I move this outside this file?
const isPastHourLimit = ({ reviewDate, hourLimit }: { reviewDate: Date; hourLimit: number }) => {
  const now = new Date()
  now.setHours(now.getHours() - hourLimit)
  const past = now

  if (reviewDate < past) return true

  return false
}

// should I move this outside this file?
const findOrCreateReviews = async (appId: number, reviews: AppStoreFeedReview[]) => {
  try {
    const reviewsLength = reviews.length

    for (let i = 0; i < reviews.length; i++) {
      const review = reviews[i]
      const isLastReview = (i + 1) === reviewsLength

      const updatedAt = new Date(review.updated.label)
      const formattedReview = {
        id: Number(review.id.label),
        appId: appId,
        userName: review.author.name.label,
        updatedAt: updatedAt,
        rating: Number(review['im:rating'].label),
        title: review.title?.label,
        content: review.content?.label
      }

      const result = await prisma.review.upsert({
        where: { id: formattedReview.id },
        update: {},
        create: formattedReview,
      })

      if (!result) throw new Error(`Failed to create review [id = ${review.id}].`)

      if (isLastReview && !isPastHourLimit({ reviewDate: updatedAt, hourLimit: DEFAULT_HOUR_LIMIT })) {
        currentPage += 1

        fetchAppStoreReviews({ page: currentPage, appId })
      }
    }
  } catch (error) {
    console.error(error)
  }
}

export const fetchAppStoreReviews = ({ appId, page }: FetchAppStoreReviewsProps) => {
  const appStoreFeedUrl = buildAppStoreFeedUrl({ page: page || 1, appId })

  https.get(appStoreFeedUrl, (res) => {
    const { statusCode } = res

    if (statusCode !== 200) {
      console.error(`There was a problem fetching reviews from the app store. Status code: ${statusCode}`)

      return
    }

    res.setEncoding('utf8')

    let responseBody = ''

    res.on('data', (data) => {
      responseBody += data
    })

    res.on('end', () => {
      const responseJSON = JSON.parse(responseBody)
      const reviews = responseJSON.feed.entry

      findOrCreateReviews(appId, reviews)
    })
  })
}