<script setup lang="ts">
import { useAuthStore } from '~/store/auth';
import { useGradeStore } from '~/store/grade';

definePageMeta({ middleware: ['auth'] })

const $router = useRouter()
const $auth = useAuthStore()
const $grade = useGradeStore()
</script>

<template>
  <div class="h-screen flex items-center justify-center">
    <div class="flex flex-col space-y-5">
      <u-button label="Logout" @click="$auth.logout()" />
      <u-button label="Register" @click="$router.push('/register')" />
      <u-button label="Get Grades" @click="$grade.getGrades()" />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>