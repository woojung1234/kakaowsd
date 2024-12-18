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
      <!-- 로그인 상태에 따라 사용자 이름 표시 -->
      <span v-if="userName" class="user-email">{{ userName }}님</span>
      <button v-if="userName" @click="logout" aria-label="로그아웃">
        <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
      </button>
      <button v-else @click="goToSignIn" aria-label="로그인">
        <font-awesome-icon :icon="['fas', 'user']" />
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// 사용자 이름 상태
const userName = ref("");

// 로그인 상태 확인 (localStorage에서 사용자 이름 불러오기)
const checkLoginStatus = () => {
  const name = localStorage.getItem("userName"); // 카카오에서 가져온 사용자 이름 저장된 키
  if (name) {
    userName.value = name;
  } else {
    userName.value = "";
  }
};

// 로그아웃 기능
const logout = () => {
  localStorage.removeItem("kakaoAccessToken"); // Access Token 삭제
  localStorage.removeItem("userName"); // 사용자 이름 삭제
  userName.value = "";
  router.push("/signin"); // 로그인 페이지로 이동
};

// 네비게이션 기능
const goToHome = () => router.push("/");
const goToPopular = () => router.push("/popular");
const goToWishlist = () => router.push("/wishlist");
const goToSearch = () => router.push("/search");
const goToSignIn = () => router.push("/signin");

// 컴포넌트 마운트 시 로그인 상태 확인
onMounted(() => {
  checkLoginStatus();
});
</script>

<style scoped>
/* 기존 스타일 그대로 유지 */
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

.nav-links {
  display: flex;
  gap: 20px;
  align-items: center;
}

button {
  background: none;
  border: none;
  color: #e6e6e6;
  font-size: 20px;
  cursor: pointer;
  transition: color 0.3s ease, transform 0.3s ease;
}

button:hover {
  color: #ffbf00;
  transform: scale(1.1);
}

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

.logo {
  font-size: 20px;
  font-weight: bold;
  color: white;
  cursor: pointer;
}

@media (max-width: 768px) {
  .nav-links {
    flex-direction: row;
    gap: 10px;
  }

  .nav-links button {
    font-size: 12px;
    width: 20px;
    height: 20px;
  }

  .fab {
    width: 20px;
    height: 20px;
    font-size: 12px;
  }

  .logo {
    font-size: 12px;
  }

  .auth button {
    font-size: 12px;
  }
}
</style>