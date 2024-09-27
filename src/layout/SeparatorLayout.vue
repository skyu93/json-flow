<template>
  <div class="container">
    <div style="overflow: auto" :style="{ width: `${dividerPercent}%` }">
      <slot name="left" />
    </div>
    <div class="separator-bar" @mousedown="handleMouseDown" />
    <div style="overflow: auto" :style="{ width: `${100 - dividerPercent}%` }">
      <slot name="right" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watch, computed } from "vue";

const props = defineProps({
  modelValue: { type: Number, required: true },
  minPercent: { type: Number, default: 10 },
});
const emits = defineEmits(["update:modelValue"]);

const isDragging = ref(false);
const dividerPercent = computed({
  get: () => props.modelValue,
  set: (value: number) => {
    emits("update:modelValue", value);
  },
});

const handleMouseDown = () => (isDragging.value = true);
const handleMouseUp = () => (isDragging.value = false);
const handleMouseMove = (e: MouseEvent) => {
  if (isDragging.value) {
    const newPercent = (e.clientX / window.innerWidth) * 100;
    if (newPercent >= props.minPercent && newPercent <= 100 - props.minPercent) {
      dividerPercent.value = newPercent;
    }
  }
};

onMounted(() => {
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
});

onUnmounted(() => {
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);
});
</script>

<style scoped>
.container {
  display: flex;
  height: 100%;
  width: 100%;
}
.separator-bar {
  background-color: lightgray;
  width: 3px;
}
.separator-bar:hover {
  cursor: col-resize;
  background-color: #364fc7;
  width: 5px;
}
</style>
