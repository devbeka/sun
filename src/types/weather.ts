export interface City {
  id: number
  name: string
  lat: number
  lon: number
  temp: number
  weather: string
}

export interface WeatherData {
  current: {
    dt: 0
    temp: 0
    weather: [{ icon: ''; description: '' }]
    humidity: 0
    wind_speed: 0
  }
  daily: [{ temp: { min: 0; max: 0 } }]
}
