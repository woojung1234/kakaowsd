<template>
  <div class="signin-container">
    <h2>로그인</h2>
    <button @click="handleKakaoLogin">카카오 로그인</button>
  </div>
</template>

<script>
export default {
  methods: {
    handleKakaoLogin() {
      const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.VUE_APP_KAKAO_API_KEY}&redirect_uri=${process.env.VUE_APP_REDIRECT_URI}&response_type=code`;
      window.location.href = kakaoAuthUrl;
    },
  },
};
</script>

<style scoped>
.signin-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #ffcc00;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}
button:hover {
  background-color: #ffa500;
}
</style>
