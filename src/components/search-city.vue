<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { searchCityByQueary } from '../services/weatherService.ts'
import { debounce } from '../utils/debounce.js'
import { transformWeatherData } from '../utils/transformWeatherData'
import type { City } from '../types/weather.ts'
import Loading from './loading.vue'

const emit = defineEmits(['getCoordinate'])

const searchText = ref<string>('')
const cities = ref<City[]>([])
const isLoading = ref(false)

const notFound = computed(
  () =>
    !isLoading.value &&
    searchText.value.trim().length >= 3 &&
    cities.value.length === 0
)

const fetchCities = debounce(async (searchText: string) => {
  if (searchText.trim().length < 3) {
    cities.value = []
    return
  }
  isLoading.value = true
  try {
    const { data } = await searchCityByQueary(searchText)
    cities.value = transformWeatherData(data)
  } catch {
    cities.value = []
  } finally {
    isLoading.value = false
  }
}, 400)

watch(searchText, fetchCities)

function selectCity(city: City) {
  emit('getCoordinate', { lat: city.lat, lon: city.lon })
  cities.value = []
  searchText.value = city.name
}
</script>

<template>
  <div
    class="w-full max-w-md h-[300px] bg-white rounded-2xl shadow-lg p-6 text-center">
    <div class="flex flex-col items-center gap-2 max-w-full relative">
      <div class="flex justify-between items-center gap-2 w-full">
        <input
          v-model="searchText"
          placeholder="Search city"
          maxlength="20"
          class="border rounded px-3 py-2 w-full" />
        <button
          @click="searchText = ''"
          class="cursor-pointer bg-amber-200 hover:bg-amber-300 text-amber-800 px-3 py-2 rounded">
          clean
        </button>
      </div>

      <ul
        v-if="cities.length"
        class="absolute top-full max-h-[210px] overflow-auto mt-1 w-full border rounded bg-white shadow divide-y z-10">
        <li
          v-for="city in cities"
          :key="city.id"
          @click="selectCity(city)"
          class="cursor-pointer px-3 py-2 hover:bg-gray-100 flex justify-between">
          <span class="text-base">{{ city.name }}</span>
          <span class="text-gray-500 text-sm">{{ city.temp }}°C</span>
        </li>
      </ul>

      <span v-else-if="notFound" class="text-sm text-center text-red-500 mt-2">
        City not found. Please enter the full name
      </span>

      <loading v-if="isLoading" class="absolute top-20" />
    </div>
  </div>
</template>
