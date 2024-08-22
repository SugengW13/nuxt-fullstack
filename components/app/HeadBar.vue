<script setup lang="ts">
import { useAuthStore } from '~/store/auth';

const { status } = useAuth()
const $auth = useAuthStore()

const $emit = defineEmits([
  'on-click-login',
  'on-click-register'
])

const isAuthenticated = computed(() => {
  return status.value === 'authenticated'
})
</script>

<template>
  <div class="px-[240px] py-3 border-b flex items-center justify-between dark:border-gray-700">
    <div class="font-semibold text-xl">
      <span class="font-bold text-primary-500">Nuxt</span>
      Fullstack
    </div>

    <div class="flex items-center space-x-3">
      <div v-if="!isAuthenticated" class="space-x-3">
        <u-button variant="outline" :disabled="$auth.isLoading.form" @click="$emit('on-click-login')">Login</u-button>
        <u-button :disabled="$auth.isLoading.form" @click="$emit('on-click-register')">Register</u-button>
      </div>

      <app-profile-dropdown v-else />
    </div>
  </div>
</template>


<style scoped></style>