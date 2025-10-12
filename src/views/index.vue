<script setup lang="ts">
import { ref } from 'vue'
import SearchCity from '../components/search-city.vue'
import WeatherModal from '../components/weather-modal.vue'

const lat = ref<number | null>(null)
const lon = ref<number | null>(null)

function setCoordinate(coord: { lat: number; lon: number }) {
  lat.value = coord.lat
  lon.value = coord.lon
}

function resetCoordinate() {
  lat.value = null
  lon.value = null
}
</script>

<template>
  <main class="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-sky-100 to-sky-800">
    <h1 class="text-2xl font-semibold mb-4 text-gray-700">Weather Forecast</h1>
    <search-city @getCoordinate="setCoordinate" />
    <weather-modal :lat="lat" :lon="lon" @reset="resetCoordinate" />
  </main>
</template>
