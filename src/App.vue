<template>
  <div id="app">
    <!-- 공통 헤더 컴포넌트 -->
    <AppHeader v-if="isLoggedIn" />
    <!-- 라우터 뷰 -->
    <router-view />
  </div>
</template>

<script setup>
import AppHeader from "@/components/AppHeader.vue";
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();


// Vuex 상태를 통해 로그인 상태를 확인
const isLoggedIn = computed(() => store.getters.isLoggedIn);
</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
