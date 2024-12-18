<template>
  <div>로그인 처리 중...</div>
</template>

<script>
import axios from "axios";

export default {
  async created() {
    const code = new URL(window.location.href).searchParams.get("code");

    if (code) {
      try {
        const response = await axios.post(
          "https://kauth.kakao.com/oauth/token",
          new URLSearchParams({
            grant_type: "authorization_code",
            client_id: process.env.VUE_APP_KAKAO_API_KEY,
            redirect_uri: process.env.VUE_APP_REDIRECT_URI,
            code,
          }),
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );

        const accessToken = response.data.access_token;
        localStorage.setItem("kakaoAccessToken", accessToken);

        const userInfo = await axios.get("https://kapi.kakao.com/v2/user/me", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        localStorage.setItem("userName", userInfo.data.properties.nickname);
        console.log("사용자 정보:", userInfo.data);

        this.$router.push("/");
      } catch (error) {
        console.error("로그인 실패", error);
      }
    }
  },
};
</script>
