<script setup lang="ts">
import { object, string } from 'yup';

const schema = object({
  email: string().email('Invalid email').required('Required'),
  password: string().min(8, 'Must be at least 8 characterss').required('Required')
})

const state = reactive({
  email: undefined,
  password: undefined
})

async function onSubmit(event: any) {
  console.log(event.data)
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email"/>
    </UFormGroup>

    <UFormGroup label="Password" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormGroup>

    <UButton type="submit">
      Submit
    </UButton>
  </UForm>
</template>

<style scoped>

</style>