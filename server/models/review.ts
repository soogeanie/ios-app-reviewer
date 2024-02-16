import { PrismaClient } from '@prisma/client';

type AppStoreFeedReview = {
  id: { label: string; };
  author: { name: { label: string; } };
  updated: { label: string; };
  "im:rating": { label: string; };
  title?: { label: string; };
  content?: { label: string; };
}

type FindOrCreateReviewsProps = {
  appId: number;
  reviews: AppStoreFeedReview[];
}

type FindManyReviewsQuery = {
  where: any;
  skip?: number;
  take?: number;
  orderBy?: any;
}

const prisma = new PrismaClient().$extends({
  model: {
    review: {
      findOrCreateReviews: async ({ appId, reviews }: FindOrCreateReviewsProps) => {
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
        } catch (error) {
          console.error(error)
        }
      },

      findManyReviews: async (query: FindManyReviewsQuery) => {
        const [reviews, count] = await prisma.$transaction([
          prisma.review.findMany(query),
          prisma.review.count({ where: query.where })
        ])

        return { reviews, total: count }
      }
    }
  }
})

export default prisma