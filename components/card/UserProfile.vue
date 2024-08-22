<script setup lang="ts">
const { data } = useAuth()

const $emit = defineEmits(['on-click-edit'])
</script>

<template>
  <u-card class="w-full">
    <template #header>
      <p class="text-lg font-medium">User Profile</p>
    </template>

    <div class="space-y-5">
      <div class="grid grid-cols-2">
        <div>
          <p class="text-sm text-gray-700 dark:text-gray-400">Name</p>
          <p>{{ data?.data.name ?? '-' }}</p>
        </div>

        <div>
          <p class="text-sm text-gray-700 dark:text-gray-400">Email</p>
          <p>{{ data?.data.email }}</p>
        </div>
      </div>

      <u-button size="md" @click="$emit('on-click-edit')">
        Edit Profile
      </u-button>
    </div>
  </u-card>
</template>


<style scoped></style>