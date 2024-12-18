<template>
  <div class="signin-page">
    <SignIn />
  </div>
</template>

<script>
import SignIn from "@/components/SignIn/SignIn.vue";

export default {
  components: {
    SignIn,
  },
};
</script>

<style scoped>
.signin-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}
</style>

