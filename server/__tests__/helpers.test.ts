import { getPastDateTime } from '../helpers'

describe('getPastDateTime', () => {
  it('returns a past date time given the hours to go back in time', () => {
    const now = new Date()
    const nowHour = now.getHours()

    const hourLimit = 5
    const past = getPastDateTime(hourLimit)

    expect(past).not.toBe(now)
    expect(past.getHours()).toBe(nowHour - hourLimit)
  })
})