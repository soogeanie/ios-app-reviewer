import { PrismaClient } from '@prisma/client'
import express from 'express'
import { DEFAULT_HOUR_LIMIT, DEFAULT_LIMIT, DEFAULT_OFFSET } from '../constants'
import { getPastDateTime } from '../helpers'

const router = express.Router()
const prisma = new PrismaClient

// fix for BigInt value TypeError
// BigInt values are not serialized in JSON by default
BigInt.prototype.toJSON = function() { return this.toString() }

router.get('/', async (req, res) => {
  const past = getPastDateTime(DEFAULT_HOUR_LIMIT)

  const queryParams = req.query
  
  let offset = Number(queryParams.offset || DEFAULT_OFFSET)
  let limit = Number(queryParams.limit || DEFAULT_LIMIT)

  const reviews = await prisma.review.findMany({
    orderBy: {
      id: 'desc',
    },
    where: {
      updatedAt: {
        gte: past
      }
    },
    skip: offset,
    take: limit,
  })

  res.status(200).json({ reviews, offset, limit })
})

export default router;