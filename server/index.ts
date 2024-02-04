// src/index.js
import express from 'express'
import cors from 'cors'
import reviewRoutes from './routes/reviews'
import { fetchAppStoreReviews } from './services/fetchAppStoreReviews'
import { DEFAULT_POLLING_TIME } from './constants'

const app = express()
const port = 3000

const APP_ID = 835599320
const POLLING_TIMEOUT = 1000 * 60 * DEFAULT_POLLING_TIME

const CORS_OPTIONS = {
  origin: ['http://localhost:8080']
}

app.use(cors(CORS_OPTIONS))

app.use('/reviews', reviewRoutes)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)

  // initial fetch
  fetchAppStoreReviews({ appId: APP_ID })

  setInterval(fetchAppStoreReviews, POLLING_TIMEOUT, { appId: APP_ID })
})