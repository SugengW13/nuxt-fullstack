<script setup lang="ts">
import { usePageStore } from '~/store/page';

definePageMeta({ middleware: ['auth'] })

const $page = usePageStore()

onMounted(() => {
  $page.setTitle('Dashboard')
})
</script>

<template>
  <div>

  </div>
</template>

<style lang="scss" scoped></style>