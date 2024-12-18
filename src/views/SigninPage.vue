<template>
  <div class="signin-page">
    <SignIn />
  </div>
</template>

<script>
import SignIn from "@/components/SignIn/SignIn.vue";
import createSignInHandlers from "@/components/SignIn/SignIn.js";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref, computed } from "vue";

export default {
  components: {
    SignIn,
  },
  setup() {
    // SignIn.js 핸들러 생성
    const handlers = createSignInHandlers({
      useRouter,
      useStore,
      ref,
      computed,
    });

    // SignIn에 필요한 메서드와 상태 반환
    return {
      ...handlers, // SignIn.js에서 반환된 함수와 변수 전달
    };
  },
};
</script>

<style scoped>
/* SignIn.css 가져오기 */
@import "@/components/SignIn/SignIn.css";
</style>
