import { createRouter, createWebHashHistory } from 'vue-router'; // 변경된 부분
import store from '../store'; // Vuex Store 가져오기
import PopularMovies from '../views/PopularMovies.vue';
import MovieDetailsPage from '../views/MovieDetailsPage.vue';
import SearchMovies from '../views/SearchMovies.vue';
import TrendMovies from '../views/TrendMovies.vue';
import WishList from '../views/WishList.vue';
import SigninPage from '../views/SigninPage.vue';

const routes = [
  {
    path: '/signin',
    name: 'signin',
    component: SigninPage,
  },
  {
    path: '/',
    name: 'home',
    component: PopularMovies,
    meta: { requiresAuth: true },
  },
  {
    path: '/popular',
    name: 'popular',
    component: TrendMovies,
    meta: { requiresAuth: true },
  },
  {
    path: '/movie/:id',
    name: 'movie-details',
    component: MovieDetailsPage,
    props: true,
    meta: { requiresAuth: true },
  },
  {
    path: '/search',
    name: 'search',
    component: SearchMovies,
    meta: { requiresAuth: true },
  },
  {
    path: '/wishlist',
    name: 'wishlist',
    component: WishList,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHashHistory('/kakaowsd/'), // Hash 모드 사용
  routes,
});

// 라우터 가드
router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isLoggedIn; // Vuex에서 상태 가져오기

  if (to.name === 'signin' && isAuthenticated) {
    next({ name: 'home' }); // 이미 로그인된 상태에서 로그인 페이지 접근 시 리다이렉트
  } else if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'signin' }); // 인증이 필요한 페이지 접근 시 로그인 페이지로 리다이렉트
  } else {
    next(); // 접근 허용
  }
});

export default router;
