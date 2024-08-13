<script setup lang="ts">
const colorMode = useColorMode()

onMounted(() => {
  colorMode.preference = 'light'
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>
