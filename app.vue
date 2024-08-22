<script setup lang="ts">
import { usePersonalizeStore } from './store/persistent/personalize';

const $colorMode = useColorMode()
const $uiConfig = useAppConfig().ui
const $personalize = usePersonalizeStore()

watch(() => $personalize.$state.primaryColor, (color) => {
  $uiConfig.primary = color
}, { immediate: true })
</script>

<template>
  <div :class="$colorMode.preference === 'light' ? 'bg-white' : 'bg-gray-900'" class="min-h-screen">
    <nuxt-layout>
      <nuxt-page />
    </nuxt-layout>

    <u-notifications class="pointer-events-none" />
  </div>
</template>
