export const getPastDateTime = (hourLimit: number) => {
  const now = new Date()
  const nowCopy = new Date(now)
  nowCopy.setHours(nowCopy.getHours() - hourLimit)
  const past = new Date(nowCopy)

  return past
}