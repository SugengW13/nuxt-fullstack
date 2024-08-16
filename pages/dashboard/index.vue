<script setup lang="ts">
import { useAuthStore } from '~/store/auth';

definePageMeta({ middleware: ['auth'] })

const $auth = useAuthStore()
</script>

<template>
  <div class="flex items-center justify-center">
    <u-button label="Logout" @click="$auth.logout()" />
  </div>
</template>

<style lang="scss" scoped></style>