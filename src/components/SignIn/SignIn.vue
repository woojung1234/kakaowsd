<template>
  <div class="signin-container">
    <h2>로그인</h2>
    <button @click="handleKakaoLogin">
      <img src="@/assets/logo.png" alt="Kakao Logo" class="kakao-logo" />
      카카오 로그인
    </button>
  </div>
</template>

<script>
export default {
  methods: {
    handleKakaoLogin() {
      try {
        const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.VUE_APP_KAKAO_API_KEY}&redirect_uri=${process.env.VUE_APP_REDIRECT_URI}&response_type=code`;
        console.log("Kakao Auth URL:", kakaoAuthUrl); // URL 확인용 로그
        window.location.href = kakaoAuthUrl;
      } catch (error) {
        console.error("카카오 로그인 오류:", error);
        alert("로그인 요청 중 문제가 발생했습니다. 다시 시도해 주세요.");
      }
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
  display: flex;
  align-items: center;
  justify-content: center;
}
button:hover {
  background-color: #ffa500;
}
.kakao-logo {
  width: 20px;
  margin-right: 10px;
}
</style>
