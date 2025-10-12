<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['close'])

function closeModal() {
  emit('close')
}

onMounted(() => (document.body.style.overflow = 'hidden'))
onUnmounted(() => (document.body.style.overflow = ''))
</script>

<template>
  <Teleport to="body">
    <div
      @click="closeModal"
      class="fixed inset-0 z-20 flex items-center justify-center bg-black/50">
      <div
        @click.stop
        class="relative flex flex-col justify-center w-full max-w-[600px] min-h-[250px] mx-3 p-6 bg-white rounded-lg shadow-lg">
        <button
          @click="closeModal"
          aria-label="close"
          class="absolute top-2 right-4 text-gray-400 text-2xl hover:text-gray-600 cursor-pointer">
          ×
        </button>
        <slot />
      </div>
    </div>
  </Teleport>
</template>
