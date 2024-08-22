<script setup lang="ts">
import { useAuthStore } from '~/store/auth';
import { loginSchema } from '~/utils/schemas';

const $auth = useAuthStore()

const $emit = defineEmits([
  'on-success',
  'on-click-cancel'
])

const isShowPassword = ref(false)

const form = reactive({
  email: 'sugeng@gmail.com',
  password: 'password'
})

async function onSubmit() {
  $auth.login({ ...form })
    .then(() => $emit('on-success'))
}
</script>

<template>
  <u-form :schema="loginSchema" :state="form" class="space-y-4" @submit="onSubmit">
    <u-form-group required label="Email" name="email">
      <u-input v-model="form.email" />
    </u-form-group>

    <u-form-group required label="Password" name="password">
      <u-input v-model="form.password" :type="isShowPassword ? 'text' : 'password'"
        :ui="{ icon: { trailing: { pointer: '' } } }">
        <template #trailing>
          <u-button :padded="false" variant="link"
            :icon="isShowPassword ? 'material-symbols:visibility-outline' : 'material-symbols:visibility-off-outline'"
            color="gray" @click="isShowPassword = !isShowPassword" />
        </template>
      </u-input>
    </u-form-group>

    <div class="grid grid-cols-2 gap-4">
      <u-button type="submit" block :loading="$auth.isLoading.form">
        Login
      </u-button>

      <u-button variant="outline" block :disabled="$auth.isLoading.form" @click="$emit('on-click-cancel')">
        Cancel
      </u-button>
    </div>
  </u-form>
</template>

<style scoped></style>