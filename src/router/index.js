import { createRouter, createWebHistory } from "vue-router"; // History Mode 사용
import store from "../store"; // Vuex Store 가져오기

// 라우터 설정
const routes = [
  {
    path: "/signin",
    name: "signin",
    component: () => import("@/components/SignIn/SignIn.vue"),
  },
  {
    path: "/auth/callback",
    name: "callback",
    component: () => import("@/components/SignIn/AuthCallback.vue"),
  },
  {
    path: "/",
    name: "home",
    component: () => import("@/views/PopularMovies.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/popular",
    name: "popular",
    component: () => import("@/views/TrendMovies.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/movie/:id",
    name: "movie-details",
    component: () => import("@/views/MovieDetailsPage.vue"),
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: "/search",
    name: "search",
    component: () => import("@/views/SearchMovies.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/wishlist",
    name: "wishlist",
    component: () => import("@/views/WishList.vue"),
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL), // History 모드 사용
  routes,
});

// 라우터 가드 설정
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isLoggedIn || localStorage.getItem("kakaoAccessToken");

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: "signin" }); // 인증 필요 페이지 접근 시 로그인 페이지로 리다이렉트
  } else if (to.name === "signin" && isAuthenticated) {
    next({ name: "home" }); // 로그인 상태에서 로그인 페이지 접근 시 홈으로 리다이렉트
  } else {
    next(); // 접근 허용
  }
});

export default router;
