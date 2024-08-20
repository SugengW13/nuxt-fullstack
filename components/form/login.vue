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
  <u-form :schema="loginSchema" :state="state" class="space-y-4" @submit="onSubmit">
    <u-form-group required label="Email" name="email">
      <u-input v-model="state.email" />
    </u-form-group>

    <u-form-group required label="Password" name="password">
      <u-input v-model="state.password" type="password" />
    </u-form-group>

    <u-button type="submit" block :loading="$auth.isLoading">
      Login
    </u-button>

    <u-button block variant="outline" type="button" @click="$router.push('/register')">
      Register
    </u-button>
  </u-form>
</template>

<style scoped></style>