import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
// Font Awesome Icons 추가
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const app = createApp(App);
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
library.add(fas);
library.add(faMagnifyingGlass);
if (localStorage.getItem("kakaoAccessToken")) {
    store.dispatch("kakaoLogin", localStorage.getItem("kakaoAccessToken"));
  }
// Vue 앱에 Toastification 플러그인 추가
app.use(Toast, toastOptions);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(store).use(router).mount('#app');
