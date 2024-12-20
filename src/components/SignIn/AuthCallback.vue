<script>
import axios from "axios";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();

    const handleCallback = async () => {
      // 1. Authorization Code 가져오기
      const code = new URLSearchParams(window.location.search).get("code");
      console.log("Authorization Code:", code); // 디버깅용 로그

      if (!code) {
        alert("Authorization code is missing. Please log in again.");
        return router.push("/signin");
      }

      try {
        // 2. Kakao Token 요청
        const response = await axios.post(
          "https://kauth.kakao.com/oauth/token",
          new URLSearchParams({
            grant_type: "authorization_code",
            client_id: process.env.VUE_APP_KAKAO_API_KEY,
            redirect_uri: process.env.VUE_APP_REDIRECT_URI,
            code,
          }),
          {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
          }
        );

        const accessToken = response.data.access_token;
        console.log("Access Token:", accessToken); // 디버깅용 로그
        localStorage.setItem("kakaoAccessToken", accessToken);

        // 3. Vuex 상태 업데이트
        await store.dispatch("kakaoLogin", accessToken);

        // 4. 홈 화면으로 리다이렉트
        router.push({ name: "home" });
      } catch (error) {
        console.error("Kakao Token Exchange Failed:", error); // 에러 디버깅
        alert("Failed to log in. Please try again.");
        router.push("/signin");
      }
    };

    handleCallback();

    return {};
  },
};
</script>
