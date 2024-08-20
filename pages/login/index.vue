<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: ['auth']
})
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <u-card>
      <template #header>
        <p class="text-2xl font-semibold text-center text-primary-500">
          Login
        </p>
      </template>

      <form-login />
    </u-card>
  </div>
</template>