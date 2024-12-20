import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
// Font Awesome Icons 추가
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

// Toast 옵션 (필요에 따라 수정 가능)
const toastOptions = {
  position: "top-right",
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: "button",
  icon: true,
};

// Font Awesome 설정
library.add(fas);
library.add(faMagnifyingGlass);

// Vue 앱 생성
const app = createApp(App);

// Vuex 상태 초기화
const initializeStore = () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const kakaoAccessToken = localStorage.getItem("kakaoAccessToken");
  const user = localStorage.getItem("user");

  console.log("LocalStorage 데이터:", {
    isLoggedIn,
    kakaoAccessToken,
    user,
  });

  if (isLoggedIn && kakaoAccessToken && user) {
    try {
      store.dispatch("loadAuthState"); // Vuex 상태 초기화
    } catch (error) {
      console.error("Vuex 상태 초기화 중 오류 발생:", error);
    }
  } else {
    console.warn("LocalStorage에 로그인 정보가 없습니다.");
  }
};

// 상태 초기화 실행
initializeStore();

// Vue 앱에 Toastification 플러그인 추가
app.use(Toast, toastOptions);
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(store).use(router).mount("#app");
