<script setup lang="ts">
import { loginSchema } from '~/utils/schemas';

const $router = useRouter()

const state = reactive({
  email: undefined,
  password: undefined
})

async function onSubmit(event: any) {
  await $fetch('/api/auth/login', {
    method: 'post'
  })
}
</script>

<template>
  <UForm :schema="loginSchema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup required label="Email" name="email">
      <UInput v-model="state.email"/>
    </UFormGroup>

    <UFormGroup required label="Password" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormGroup>

    <UButton type="submit" block>
      Login
    </UButton>

    <UButton block variant="outline" type="button" @click="$router.push('/register')">
      Register
    </UButton>
  </UForm>
</template>

<style scoped>

</style>