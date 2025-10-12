<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getWeather } from '../composables/useWeatherCache'
import { formatDate } from '../utils/formatDate'
import { formatTemp, isValidCoordinate } from '../utils/formatWeather'
import type { WeatherData } from '../types/weather.ts'
import AppModal from './app-modal.vue'
import Loading from './loading.vue'

const props = defineProps<{
  lat: number | null
  lon: number | null
}>()
const emit = defineEmits(['reset'])

const router = useRouter()
const route = useRoute()

const isModalOpen = ref<boolean>(false)
const weatherData = ref<WeatherData | null>(null)
const isLoading = ref<boolean>(false)

async function openWeatherModal(lat: number, lon: number) {
  isModalOpen.value = true
  updateQuery(lat, lon)
  await load(lat, lon)
}

function closeWeatherModal() {
  isModalOpen.value = false
  clearQuery()
  emit('reset')
}

function updateQuery(lat: number, lon: number) {
  router.push({
    query: { lat: lat.toString(), lon: lon.toString() },
  })
}

function clearQuery() {
  router.replace({ path: route.path })
}

async function load(lat: number, lon: number) {
  isLoading.value = true
  try {
    const data = await getWeather(lat, lon)
    weatherData.value = data
  } catch (error) {
    console.error('Error loading weather:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  const { lat, lon } = route.query

  const formatLat = Number(lat)
  const formatLon = Number(lon)

  const isValid = isValidCoordinate(formatLat, formatLon)

  if (isValid) {
    openWeatherModal(formatLat, formatLon)
  } else if (lat || lon) {
    clearQuery()
  }
})

watch(
  () => [props.lat, props.lon],
  ([latValue, lonValue]) => {
    if (latValue != null && lonValue != null && !isModalOpen.value) {
      openWeatherModal(latValue, lonValue)
    }
  },
  { immediate: true }
)
</script>

<template>
  <app-modal v-if="isModalOpen" @close="closeWeatherModal">
    <loading v-if="isLoading" />

    <div v-else-if="weatherData" class="text-center space-y-2">
      <h3 class="text-xl font-semibold">
        {{ formatDate(weatherData.current.dt) }}
      </h3>

      <div class="flex items-center justify-center gap-3">
        <img
          v-if="weatherData.current.weather?.[0]?.icon"
          :src="`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
          alt="weather icon"
          class="w-15 h-15" />
        <span class="text-4xl font-bold uppercase">
          {{ formatTemp(weatherData.current.temp) }}
        </span>
      </div>

      <div class='flex flex-col items-center space-y-1'>
        <span class="text-gray-600">
          Min: {{ formatTemp(weatherData.daily[0].temp.min) }} /
          Max: {{ formatTemp(weatherData.daily[0].temp.max) }}
        </span>
        <span class="capitalize text-gray-500">
          {{ weatherData.current.weather[0]?.description }}
        </span>
        <span class="text-sm text-gray-400">
          Humidity: {{ weatherData.current.humidity }}% |
          Wind: {{ weatherData.current.wind_speed }} m/s
        </span>
      </div>
    </div>
  </app-modal>
</template>
