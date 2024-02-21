import { Prisma } from '@prisma/client'
import express from 'express'
import { DEFAULT_APP_ID, DEFAULT_HOUR_LIMIT } from '../constants'
import { getPastDateTime } from '../helpers'
import prisma, { Review } from '../models/review'

const router = express.Router()

type QueryParams = {
  limit: number;
  page: number;
  pastHours: number;
  sort: Prisma.SortOrder;
}

type PagesProps = {
  total: number;
  current: number;
  next?: number | null;
  prev?: number | null;
}

type ReviewsResponse = Pick<QueryParams, 'limit' | 'sort'> & {
  reviews: Review[];
  total: number;
  pages: PagesProps;
}

const DEFAULT_QUERY_PARAMS = Object.freeze({
  limit: 20,
  offset: 0,
  page: 1,
  sort: 'desc'
})

// fix for BigInt value TypeError
// BigInt values are not serialized in JSON by default
BigInt.prototype.toJSON = function() { return this.toString() }

router.get('/', async (req, res) => {
  const queryParams: Partial<QueryParams> = req.query
  
  const limit: QueryParams['limit'] = Number(queryParams.limit || DEFAULT_QUERY_PARAMS.limit)
  const page: QueryParams['page'] = Number(queryParams.page || DEFAULT_QUERY_PARAMS.page)
  const pastHours: QueryParams['pastHours'] = Number(queryParams.pastHours || DEFAULT_HOUR_LIMIT)
  const sort = queryParams.sort || DEFAULT_QUERY_PARAMS.sort as Prisma.SortOrder

  const offset: number = Number((page * limit) - limit)

  const past = getPastDateTime(pastHours)

  const results = await prisma.review.findManyReviews({
    where: {
      AND: [
        {
          appId: DEFAULT_APP_ID,
        },
        {
          updatedAt: {
            gte: past
          }
        }
      ]
    },
    skip: offset,
    take: limit,
    orderBy: {
      updatedAt: sort
    }
  })

  const totalPages = !!results.total ? Number(Math.ceil(results.total / limit)) : 0
  const currentPage = !!results.total ? page : 1

  const pages: PagesProps = {
    total: totalPages,
    current: currentPage,
    next: totalPages > 1 ? currentPage + 1 : null,
    prev: currentPage > 1 ? currentPage - 1 : null
  }

  const response: ReviewsResponse = {
    ...results,
    limit,
    sort,
    pages
  }

  res.status(200).json(response)
})

export default router;