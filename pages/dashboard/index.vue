<script setup lang="ts">
import { usePageStore } from '~/store/page';

definePageMeta({ middleware: ['auth'] })

const $router = useRouter()
const $page = usePageStore()

onMounted(() => {
  $page.setTitle('Dashboard')
})
</script>

<template>
  <div>
    Dashboard page
  </div>
</template>

<style lang="scss" scoped></style>