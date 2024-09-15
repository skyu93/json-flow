<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean },
});
const emits = defineEmits(['update:modelValue'])

const toggle = computed(() => props.modelValue)
const iconRef = ref<HTMLElement | null>()
const moveToLeftKeyframes = [
  { transform:  'translateX(0px)' },
  { transform: 'translateX(17px)' }
]
const moveToRightKeyframes = [
  { transform:  'translateX(17px)' },
  { transform: 'translateX(0px)' }
]


const playToggleAnimation = () => {
  if(!iconRef.value) return
  const keyframes = toggle.value ? moveToLeftKeyframes : moveToRightKeyframes
  const options: KeyframeAnimationOptions = {
    duration: 150,
    iterations: 1,
    easing: 'linear',
    fill: 'forwards'
  }
  iconRef.value.animate(keyframes, options)
}
const onToggle = () => {
  emits('update:modelValue', !toggle.value)
}

watch(() => toggle.value, playToggleAnimation)

</script>

<template>
 <button class="image-toggle" @click="onToggle">
   <span class="icon" ref="iconRef">
     <img v-if="toggle" src="../assets/moon.svg" alt="moon" />
     <img v-else src="../assets/sun.svg" alt="sun" />
   </span>
 </button>
</template>

<style scoped>
.image-toggle {
  position: relative;
  border-radius: 11px;
  display: block;
  width: 40px;
  height: 22px;
  border: 1px solid rgba(60, 60, 60, 0.29);
  background-color: #f1f1f1;
}
.image-toggle:hover {
  cursor: pointer;
}
.icon {
  position: absolute;
  top: 1px;
  left: 1px;
}
.icon img {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 12px;
  height: 12px;
}
</style>
