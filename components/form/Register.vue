<script setup lang="ts">
import { useAuthStore } from '~/store/auth';
import { registerSchema } from '~/utils/schemas';

const $router = useRouter()
const $auth = useAuthStore()

const state = reactive({
  email: undefined,
  password: undefined,
  passwordConfirmation: undefined
})

async function onSubmit() {
  $auth.register({...state})
}
</script>

<template>
  <div>
    <u-form :schema="registerSchema" :state="state" class="space-y-4" @submit="onSubmit" @error="(e) => {console.log(e)}">
      <u-form-group required label="Email" name="email">
        <u-input v-model="state.email" />
      </u-form-group>

      <u-form-group required label="Password" name="password">
        <u-input v-model="state.password" type="password" />
      </u-form-group>

      <u-form-group required label="Password Confirmation" name="passwordConfirmation">
        <u-input v-model="state.passwordConfirmation" type="password" />
      </u-form-group>

      <u-button type="submit" block>
        Register
      </u-button>

      <u-button block variant="outline" type="button" @click="$router.push('/login')">
        Login
      </u-button>
    </u-form>
  </div>
</template>

<style scoped></style>