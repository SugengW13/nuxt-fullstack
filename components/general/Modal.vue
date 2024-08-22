<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: null
  }
})

const $emit = defineEmits(['update:model-value'])
</script>

<template>
  <u-modal v-model="props.modelValue" prevent-close>
    <u-card>
      <template #header>
        <div class="flex items-center justify-between">
          <p class="text-lg font-semibold">
            {{ props.title }}
          </p>

          <u-button :padded="false" variant="link" icon="material-symbols:close-rounded" color="gray"
            @click="$emit('update:model-value', false)" />
        </div>
      </template>

      <slot name="default" />
    </u-card>
  </u-modal>
</template>

<style></style>