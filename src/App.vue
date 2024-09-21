<script setup lang="ts">
import { computed, ref } from "vue";
import SeparatorLayout from "./layout/SeparatorLayout.vue";
import Logo from "./components/Logo.vue";
import { useStore } from "./store/store.ts";

const dividerPercent = ref(20);
const currentCaretPosition = computed(() => {
  const { row, col } = useStore().currentCaretPosition;
  return { row, col };
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
      <template #left></template>
      <template #right></template>
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
.full-width {
  width: 100%;
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
