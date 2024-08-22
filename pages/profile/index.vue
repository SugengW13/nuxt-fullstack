<script setup lang="ts">
import { usePageStore } from '~/store/page';

definePageMeta({ middleware: ['auth'] })

const $page = usePageStore()

const isOpenModal = ref({
  editProfile: false
})

onMounted(() => {
  $page.setTitle('My Profile')
})
</script>

<template>
  <div class="space-y-5">
    <general-modal v-model="isOpenModal.editProfile" title="Edit Profile">
      <form-edit-profile @on-click-cancel="isOpenModal.editProfile = false"
        @on-success="isOpenModal.editProfile = false" />
    </general-modal>

    <app-button-back />

    <div class="flex space-x-5">
      <card-user-profile @on-click-edit="isOpenModal.editProfile = true" />

      <card-personalize />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>