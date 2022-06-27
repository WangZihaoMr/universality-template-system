<template>
  <div class="container">
    <span
      :class="[props.icon]"
      :style="{ 'font-size': props.size + 'px', color: props.color }"
    ></span>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  icon: {
    type: String,
    default: ''
  },
  size: {
    type: Number,
    default: 16
  },
  color: {
    type: String,
    default: '#000'
  }
})
</script>

<style scoped lang="scss"></style>
