import { api } from '../utils/axios'

export async function searchCityByQueary(searchText: string) {
  return await api.get('/find', {
    params: { q: searchText, units: 'metric' },
  })
}

export async function getWeatherByCoordinate(lat: number, lon: number) {
  return await api.get('/onecall', {
    params: { lat, lon, units: 'metric' },
  })
}
