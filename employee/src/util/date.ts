export const standardDate = (date: Date) => {
  date.setHours(0, 0, 0, 0)
  date.setTime(date.getTime() + date.getTimezoneOffset() * 60 * 1000)
  return date
}
