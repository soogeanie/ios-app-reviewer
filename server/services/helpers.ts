import { getPastDateTime } from '../helpers'

export const isWithinHourLimit = ({ reviewDate, hourLimit }: { reviewDate: Date; hourLimit: number }) => {
  const past = getPastDateTime(hourLimit)
  const dateToCompare = new Date(reviewDate)

  if (dateToCompare < past) return false

  return true
}

export const fetchReviews = async (url: string) => {
  try {
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Network response was not OK. ${response.statusText}`)
    }

    const results = await response.json()
  
    return results.feed.entry
  } catch (error) {
    console.error(error)
  }
}