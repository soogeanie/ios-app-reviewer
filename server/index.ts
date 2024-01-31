// src/index.js
import express from 'express'
import reviewRoutes from './routes/reviews'
import { fetchAppStoreReviews } from './services/fetchAppStoreReviews'

const app = express()
const port = 3000

app.use('/reviews', reviewRoutes)

app.listen(port, () => {
  // wrap in set time out or interval
  fetchAppStoreReviews({ appId: 835599320 })

  console.log(`[server]: Server is running at http://localhost:${port}`)
})