import { Prisma, PrismaClient } from '@prisma/client'
import express from 'express'
import { DEFAULT_HOUR_LIMIT } from '../constants'
import { getPastDateTime } from '../helpers'

const router = express.Router()
const prisma = new PrismaClient

type QueryParams = {
  limit?: number;
  page?: number;
  pastHours?: number;
  sort?: Prisma.SortOrder;
}

type RequiredQueryParams = Required<QueryParams>

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
  const queryParams: QueryParams = req.query
  
  const limit: RequiredQueryParams['limit'] = Number(queryParams.limit || DEFAULT_QUERY_PARAMS.limit)
  const page: RequiredQueryParams['page'] = Number(queryParams.page || DEFAULT_QUERY_PARAMS.page)
  const pastHours: RequiredQueryParams['pastHours'] = Number(queryParams.pastHours || DEFAULT_HOUR_LIMIT)
  const sort = queryParams.sort || DEFAULT_QUERY_PARAMS.sort as Prisma.SortOrder

  const offset: number = Number((page * limit) - limit)

  const past = getPastDateTime(pastHours)

  const reviews = await prisma.review.findMany({
    where: {
      updatedAt: {
        gte: past
      }
    },
    skip: offset,
    take: limit,
    orderBy: {
      updatedAt: sort
    }
  })

  res.status(200).json({ reviews, page, pastHours, sort })
})

export default router;