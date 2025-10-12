import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL as string
const apiKey = import.meta.env.VITE_API_KEY as string

export const api = axios.create({
  baseURL,
  params: { appid: apiKey },
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error)
  }
)
