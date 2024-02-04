import { PrismaClient } from '@prisma/client';
import { AppStoreFeedReview } from '../services/fetchAppStoreReviews';

type FindOrCreateReviewsProps = {
  appId: number;
  reviews: AppStoreFeedReview[];
}

const prisma = new PrismaClient()

export const findOrCreateReviews = async ({ appId, reviews }: FindOrCreateReviewsProps) => {
  try {
    let results = []

    for (let i = 0; i < reviews.length; i++) {
      const review = reviews[i]

      const formattedReview = {
        id: Number(review.id.label),
        appId: appId,
        userName: review.author.name.label,
        updatedAt: new Date(review.updated.label),
        rating: Number(review['im:rating'].label),
        title: review.title?.label,
        content: review.content?.label
      }

      const result = await prisma.review.upsert({
        where: { id: formattedReview.id },
        update: {},
        create: formattedReview,
      })

      if (!result) throw new Error(`Failed to create review: ${JSON.stringify(formattedReview)}`)

      results.push(result)
    }

    return results
  } catch(error) {
    console.error(error)
  }
}