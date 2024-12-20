<template>
  <div id="app">
    <!-- 로딩 중일 때 표시 -->
    <div v-if="isLoading" class="loading">
      <p>Loading...</p>
    </div>

    <!-- 로그인 상태에 따라 화면 표시 -->
    <div v-else>
      <AppHeader v-if="isLoggedIn" />
      <router-view />
    </div>
  </div>
</template>

<script setup>
import AppHeader from "@/components/AppHeader.vue";
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";

const store = useStore();
const isLoading = ref(true);

// Vuex 상태를 통해 로그인 상태 확인
const isLoggedIn = computed(() => store.getters.isLoggedIn);

onMounted(() => {
  // Vuex 초기 상태 로드
  if (!isLoggedIn.value) {
    store.dispatch("loadAuthState");
  }
  isLoading.value = false; // 로딩 상태 해제
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 20px;
  color: #666;
}
</style>
