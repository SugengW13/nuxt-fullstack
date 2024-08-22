<script setup lang="ts">
import { usePageStore } from '~/store/page';

const $page = usePageStore()
</script>

<template>
  <div class="w-full">
    <app-head-bar />

    <div class="py-10 px-[240px]">
      <p class="text-xl font-semibold mb-5">{{ $page.title }}</p>

      <slot />
    </div>
  </div>
</template>