<script setup lang="ts">
import { computed, onMounted, reactive, ref } from "vue";
import SeparatorLayout from "./layout/SeparatorLayout.vue";
import Logo from "./components/Logo.vue";
import { useStore } from "./store/store.ts";

import Editor from "./components/Editor.vue";
import JsonFlow from "./components/JsonFlow.vue";

const store = useStore();
const dividerPercent = ref(20);
const currentCaretPosition = computed(() => {
  const { row, col } = store.currentCaretPosition;
  return { row, col };
});

const editorText = computed({
  get: () => store.json,
  set: (value: string) => {
    store.json = value;
  },
});
const editorRect = reactive({
  width: 0,
  height: 0,
});
const resizeElement = ref(null);

const handleResize = (entries: ResizeObserverEntry[]) => {
  entries.forEach(entry => {
    const { width, height } = entry.contentRect;
    editorRect.width = width;
    editorRect.height = height;
  });
};

let observer = null;

onMounted(() => {
  observer = new ResizeObserver(handleResize);
  if (resizeElement.value) {
    observer.observe(resizeElement.value);
  }
});
</script>

<template>
  <header>
    <div class="header__wrapper">
      <Logo class="margin-x" />
      <div class="header__content">
        <div class="text-black"></div>
        <div class="text-black"></div>
      </div>
    </div>
  </header>
  <main>
    <SeparatorLayout v-model="dividerPercent">
      <template #left>
        <div ref="resizeElement" class="full-container">
          <editor v-model="editorText" :width="editorRect.width" :height="editorRect.height" />
        </div>
      </template>
      <template #right>
        <JsonFlow />
      </template>
    </SeparatorLayout>
  </main>
  <footer>
    <div class="footer__wrapper">
      <div class="flex" style="flex-grow: 1">
        <div class="text-black"></div>
      </div>
      <div class="flex" style="flex-grow: 1; justify-content: end">
        <div class="text-black">row: {{ currentCaretPosition.row }}</div>
        <div class="text-black" style="margin-left: 1rem">col: {{ currentCaretPosition.col }}</div>
      </div>
    </div>
  </footer>
</template>

<style>
/* these are necessary styles for vue flow */
@import "@vue-flow/core/dist/style.css";

/* this contains the default theme, these are optional styles */
@import "@vue-flow/core/dist/theme-default.css";
.flex {
  display: flex;
  align-items: center;
}
.justify-between {
  justify-content: space-between;
}
.text-black {
  color: black;
}
.full-container {
  width: 100%;
  height: 100%;
}

.margin-x {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
.header__wrapper {
  height: 100%;
  display: flex;
  align-items: center;
}
.header__content {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}

.footer__wrapper {
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
</style>
