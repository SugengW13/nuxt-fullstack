<script setup lang="ts">
import { editProfileSchema } from '#imports';
import { useAuthStore } from '~/store/auth';
import type { FormEditProfile } from '~/utils/types';

const { data } = useAuth()
const $auth = useAuthStore()

const $emit = defineEmits(['on-success', 'on-click-cancel'])

const form = reactive<FormEditProfile>({
  email: undefined,
  name: undefined
})

onMounted(() => {
  if (data.value) {
    form.email = data.value.data.email
    form.name = data.value.data.name ?? ''
  }
})

async function onSubmit() {
  $auth.updateProfile({ ...form })
    .then(async () => {
      $emit('on-success')
    })
}
</script>

<template>
  <u-form :schema="editProfileSchema" :state="form" @submit="onSubmit">
    <u-form-group required label="Email" name="email" class="mb-4">
      <u-input v-model="form.email" disabled />
    </u-form-group>

    <u-form-group required label="Name" name="name" class="mb-5">
      <u-input v-model="form.name" />
    </u-form-group>

    <div class="grid grid-cols-2 gap-5">
      <u-button block type="submit" :loading="$auth.isLoading.form">
        Save
      </u-button>

      <u-button block type="button" variant="outline" :disabled="$auth.isLoading.form"
        @click="$emit('on-click-cancel')">
        Cancel
      </u-button>
    </div>
  </u-form>
</template>

<style></style>