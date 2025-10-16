import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL as string
const apiKey = import.meta.env.VITE_API_KEY as string

if (!baseURL || !apiKey) {
  throw new Error(
    '[Config Error] Missing environment variables: VITE_API_BASE_URL or VITE_API_KEY. ' +
      'Check your .env file and Vite setup.'
  )
}

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
