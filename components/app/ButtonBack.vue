<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    default: 'Back'
  }
})

const $router = useRouter()

function onClickBack() {
  $router.back()
}
</script>

<template>
  <u-button icon="material-symbols:arrow-back" variant="link" :padded="false" :label="props.label" @click="onClickBack"/>
</template>


<style scoped></style>