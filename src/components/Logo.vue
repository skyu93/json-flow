<script setup lang="ts">
const goToHome = () => {};
</script>
<template>
  <button class="btn__logo" @click="goToHome">
    <img src="../assets/logo.svg" alt="JSON FLOW 로고 이미지" />
  </button>
</template>

<style scoped>
.btn__logo {
  background: inherit;
  border: none;
  box-shadow: none;
  border-radius: 0;
  padding: 0;
  overflow: visible;
  cursor: pointer;
}
.btn__logo:hover {
  background: lightgray;
}
</style>
