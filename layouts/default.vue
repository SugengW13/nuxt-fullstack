<script setup lang="ts">
import { usePageStore } from '~/store/page';

const $page = usePageStore()

const isOpenModal = reactive({
  login: false,
  register: false
})
</script>

<template>
  <div class="w-full">
    <general-modal v-model="isOpenModal.login" title="Login">
      <form-login @on-success="isOpenModal.login = false" @on-click-cancel="isOpenModal.login = false" />
    </general-modal>

    <general-modal v-model="isOpenModal.register" title="Register">
      <form-register @on-success="isOpenModal.register = false" @on-click-cancel="isOpenModal.register = false" />
    </general-modal>

    <app-head-bar @on-click-login="isOpenModal.login = true" @on-click-register="isOpenModal.register = true" />

    <div class="py-10 px-[240px]">
      <p class="text-xl font-semibold mb-5">{{ $page.title }}</p>

      <slot />
    </div>
  </div>
</template>