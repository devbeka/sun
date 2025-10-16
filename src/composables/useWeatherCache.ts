import { getWeatherByCoordinate } from '../services/weatherService'

const weatherCache = new Map<string, { data: unknown; timestamp: number }>()
const CACHE_TTL = 5 * 60 * 1000

export async function getWeather(lat: number, lon: number) {
  const key = `${lat},${lon}`
  const cached = weatherCache.get(key)
  const now = Date.now()

  if (cached && now - cached.timestamp < CACHE_TTL) {
    return cached.data
  }

  const { data } = await getWeatherByCoordinate(lat, lon)

  weatherCache.set(key, { data, timestamp: now })
  return data
}
