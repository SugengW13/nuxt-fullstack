<script setup lang="ts">
import { usePersonalizeStore } from '~/store/persistent/personalize';

const $colorMode = useColorMode()
const $uiConfig = useAppConfig().ui
const $personalize = usePersonalizeStore()

const $emit = defineEmits(['on-click-edit'])

const selectedColorMode = ref<any>(null)

const colorModeOptions = [
  { id: 'light', label: 'Light', icon: 'material-symbols:light-mode' },
  { id: 'dark', label: 'Dark', icon: 'material-symbols:dark-mode' },
  { id: 'system', label: 'System', icon: 'material-symbols:desktop-windows-outline' }
]

const primaryColorOptions = computed(() => {
  return $uiConfig.colors.filter(c => c !== 'primary')
})

watch(() => $colorMode.preference, (value) => {
  selectedColorMode.value = colorModeOptions.find(cm => cm.id === value)
}, { immediate: true })

function onChangeColorMode(value: any) {
  $colorMode.preference = value.id
}
</script>

<template>
  <u-card class="w-full">
    <template #header>
      <p class="text-lg font-medium">Personalize</p>
    </template>

    <div class="grid grid-cols-2 gap-5">
      <div class="space-y-2">
        <p class="text-sm text-gray-700 dark:text-gray-400">Color Mode</p>

        <u-select-menu :model-value="selectedColorMode" :options="colorModeOptions" placeholder="Select Color Mode"
          @update:model-value="onChangeColorMode($event)" />
      </div>

      <div class="space-y-2">
        <p class="text-sm text-gray-700 dark:text-gray-400">Primary Color</p>

        <div class="grid grid-cols-5 gap-2 w-fit">
          <div v-for="color in primaryColorOptions" :class="`bg-${color}-400`"
            class="w-4 h-4 rounded-full cursor-pointer hover:opacity-75" @click="$personalize.setPrimaryColor(color)" />
        </div>
      </div>
    </div>
  </u-card>
</template>


<style scoped></style>