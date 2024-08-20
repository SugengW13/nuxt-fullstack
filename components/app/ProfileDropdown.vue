<script setup lang="ts">
import { useAuthStore } from '~/store/auth';

const { data } = useAuth()
const $router = useRouter()
const $colorMode = useColorMode()
const $auth = useAuthStore()

const isLightMode = computed(() => {
  return $colorMode.value === 'light'
})

const items = computed(() => {
  return [
    [{ label: data.value?.data.email!, slot: 'account', disabled: true }],
    [
      { label: 'Settings', icon: 'material-symbols:settings-outline' },
      { label: `${isLightMode.value ? 'Dark' : 'Light'} Mode`, icon: isLightMode.value ? 'material-symbols:dark-mode' : 'material-symbols:light-mode', slot: 'color_mode' }
    ],
    [{ label: 'Logout', slot: 'logout', icon: 'material-symbols:logout' }]
  ]
})

async function onClickColorMode() {
  $colorMode.preference = isLightMode.value ? 'dark' : 'light'
}

async function onClickLogout() {
  const res = await $auth.logout()
  if (res) $router.push('/login')
}
</script>

<template>
  <u-dropdown :items="items" :ui="{ item: { disabled: 'cursor-text select-text' } }"
    :popper="{ placement: 'bottom-start' }">
    <u-avatar :icon="data?.data.name ? undefined : 'material-symbols:person'" :alt="data?.data.name ?? undefined" />

    <template #account="{ item }">
      <div class="w-full flex flex-col items-start">
        <p class="text-xs">Signed in as</p>
        <p class="font-medium">{{ item.label }} </p>
      </div>
    </template>

    <template #color_mode="{ item }">
      <div class="w-full flex items-center justify-between" @click="onClickColorMode">
        <p>{{ item.label }}</p>
        <u-icon :name="item.icon" class="h-4 w-4" />
      </div>
    </template>

    <template #logout="{ item }">
      <div class="w-full flex items-center justify-between" @click="onClickLogout">
        <p>{{ item.label }} </p>
        <u-icon :name="item.icon" class="h-4 w-4" />
      </div>
    </template>

    <template #item="{ item }">
      <div class="w-full flex items-center justify-between">
        <p>{{ item.label }} </p>
        <u-icon :name="item.icon" class="h-4 w-4" />
      </div>
    </template>
  </u-dropdown>
</template>


<style scoped></style>