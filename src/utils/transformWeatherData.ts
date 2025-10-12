import type { City } from '../types/weather'

export function transformWeatherData(data: any): City[] {
  if (!data?.list) return []

  return data.list.map((city: any) => ({
    id: city.id,
    name: `${city.name}, ${city.sys.country}`,
    lat: city.coord.lat,
    lon: city.coord.lon,
    temp: Math.round(city.main.temp),
    weather: city.weather[0]?.description || '',
  }))
}
