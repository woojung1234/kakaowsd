<template>
  <header class="header">
    <!-- 로고 -->
    <div class="logo">
      <button @click="goToHome" aria-label="로고">
        <font-awesome-icon :icon="['fas', 'tape']" />
      </button>
    </div>

    <!-- 중앙 네비게이션 -->
    <nav class="nav-links">
      <button @click="goToHome" aria-label="홈화면">
        <font-awesome-icon :icon="['fas', 'house']" />
      </button>
      <button @click="goToPopular" aria-label="인기 영화">
        <font-awesome-icon :icon="['fas', 'fire']" />
      </button>
      <button @click="goToWishlist" aria-label="좋아하는 영화">
        <font-awesome-icon :icon="['fas', 'heart']" />
      </button>
      <button class="fab" @click="goToSearch" aria-label="검색">
        <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
      </button>
    </nav>

    <!-- 우측 사용자 정보 및 로그아웃 -->
    <div class="auth">
      <span v-if="isLoggedIn" class="user-email">{{ userEmail }}</span>
      <button v-if="isLoggedIn" @click="logout" aria-label="로그아웃">
        <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
      </button>
      <button v-else @click="goToSignIn" aria-label="로그인">
        <font-awesome-icon :icon="['fas', 'user']" />
      </button>
    </div>
  </header>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

const isLoggedIn = computed(() => store.getters.isLoggedIn);
const userEmail = computed(() => {
  const user = store.getters.user;
  return user ? user.email : "";
});

const logout = () => {
  store.dispatch("logout");
  router.push("/signin");
};
const goToSearch = () => {
  router.push('/search');
};
const goToHome = () => {
  router.push("/");
};
const goToPopular = () => {
  router.push("/popular");
};
const goToWishlist = () => {
  router.push("/wishlist");
};
</script>


<style scoped>

.user-email {
  margin-right: 0px;
  font-size: 15px;
  font-weight: bold;
  color: #f4ebeb;
}

.header {
  padding: 10px 20px;
  background-color: rgba(31, 31, 31, 0.9);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: background-color 0.3s ease;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
}

.header:hover {
  background-color: rgba(50, 50, 50, 1);
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.nav-links {
  display: flex;
  gap: 20px; /* 버튼 간 간격 */
  align-items: center;
}

button {
  background: none;
  border: none;
  color: #e6e6e6;
  font-size: 20px; /* 아이콘 크기 */
  cursor: pointer;
  transition: color 0.3s ease, transform 0.3s ease;
}

button:hover {
  color: #ffbf00; /* 호버 시 강조 색상 */
  transform: scale(1.1); /* 살짝 확대 */
}

/* FAB 스타일 */
.fab {
  background-color: rgba(50, 50, 50, 1);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease, background-color 0.3s ease;
}

.fab:hover {
  background-color: #ffa500;
  transform: scale(1.1);
}

/* 로고 스타일 */
.logo {
  font-size: 20px;
  font-weight: bold;
  color: white;
  cursor: pointer;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  .nav-links {
    display: flex;
    flex-direction: row; /* 모바일에서도 가로로 배치 */
    gap: 10px; /* 버튼 간 간격 줄이기 */
    justify-content: center; /* 중앙 정렬 */
  }

  .nav-links button {
    font-size: 12px; /* 아이콘 크기 줄이기 */
    width: 20px; /* 버튼 크기 줄이기 */
    height: 20px; /* 버튼 크기 줄이기 */
  }

  .fab {
    width: 20px; /* 검색 버튼 크기 줄이기 */
    height: 20px; /* 검색 버튼 크기 줄이기 */
    font-size: 12px; /* 아이콘 크기 조정 */
  }

  .logo {
    font-size: 12px; /* 로고 크기 축소 */
  }

  .auth button {
    font-size: 12px; /* 로그인/로그아웃 아이콘 크기 축소 */
  }
}
</style>