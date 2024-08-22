<script setup lang="ts">
const $colorMode = useColorMode()
</script>

<template>
  <div :class="$colorMode.preference === 'light' ? 'bg-white' : 'bg-gray-900'" class="min-h-screen">
    <nuxt-layout>
      <nuxt-page />
    </nuxt-layout>

    <u-notifications class="pointer-events-none" />
  </div>
</template>
