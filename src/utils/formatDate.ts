export function formatDate(unix: number) {
  const date = new Date(unix * 1000)
  const weekday = date.toLocaleDateString('en-US', { weekday: 'long' })
  const dayNum = date.getDate()
  return `${weekday}, ${dayNum}`
}
