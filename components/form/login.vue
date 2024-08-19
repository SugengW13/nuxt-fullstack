<script setup lang="ts">
import { useAuthStore } from '~/store/auth';
import { loginSchema } from '~/utils/schemas';

const $router = useRouter()
const $auth = useAuthStore()

const state = reactive({
  email: 'sugeng@gmail.com',
  password: 'password'
})

async function onSubmit() {
  await $auth.login({ ...state })
}
</script>

<template>
  <UForm :schema="loginSchema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup required label="Email" name="email">
      <UInput v-model="state.email" />
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

<style scoped></style>