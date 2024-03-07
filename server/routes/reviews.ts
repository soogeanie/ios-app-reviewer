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
  totalPages: number | null;
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
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

const DEFAULT_PAGES: PagesProps = Object.freeze({
  totalPages: null,
  currentPage: 1,
  nextPage: null,
  prevPage: null
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

  let totalPages = DEFAULT_PAGES.totalPages
  let currentPage = DEFAULT_PAGES.currentPage
  let nextPage = DEFAULT_PAGES.nextPage
  let prevPage = DEFAULT_PAGES.prevPage

  if (!!results.total) {
    totalPages = Number(Math.ceil(results.total / limit))
    currentPage = page
  }

  if (!!totalPages) {
    nextPage = currentPage !== totalPages ? currentPage + 1 : null
    prevPage = currentPage > 1 ? currentPage - 1 : null
  }

  const pages: PagesProps = { totalPages, currentPage, nextPage, prevPage }

  const response: ReviewsResponse = {
    ...results,
    limit,
    sort,
    pages
  }

  res.status(200).json(response)
})

export default router;