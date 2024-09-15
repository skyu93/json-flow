<script setup lang="ts">
import ThemeSwitch from './components/ThemeSwitch.vue'
import { computed, onMounted, watch } from 'vue'
import { useStore } from './store/store.ts'

const isDarkMode = computed({
  get: () => useStore().isDarkMode,
  set: flag => useStore().isDarkMode = flag,
})
onMounted(() => {
  isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
})

watch(() => isDarkMode.value, () => {
  document.documentElement.setAttribute('color-theme', isDarkMode.value ? 'dark' : 'light');
})
</script>

<template>
  <div class="wrapper">
    <header>
      <button class="logo">
        <img src="./assets/logo.svg" alt="logo" />
      </button>
      <ThemeSwitch v-model="isDarkMode" />
    </header>
    <main></main>
    <footer></footer>
  </div>
</template>

<style>
header {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--bg-bar);
}
main {
  padding-top: 30px;
  height: calc(100vh - 100px);
}
footer {
  position: fixed;
  bottom: 0;
  width: 100vw;
  height: 26px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--bg-bar);
}
.logo {
  background: inherit;
  background-image: url(./assets/logo.svg);
  border:none;
  box-shadow:none;
  border-radius:0;
  padding:0;
  overflow: visible;
  cursor:pointer
}

</style>
