<template>
  <div>
    <div class="bg-image"></div>
    <div class="container">
      <div id="phone">
        <div id="content-wrapper">
          <!-- 로그인 카드 -->
          <div :class="['card', { hidden: !isLoginVisible }]" id="login">
            <form @submit.prevent="handleLogin">
              <h1>Sign in</h1>
              <div class="input" :class="{ active: isEmailFocused || email }">
                <input
                    id="email"
                    type="email"
                    v-model="email"
                    @focus="focusInput('email')"
                    @blur="blurInput('email')"
                    required
                />
                <label for="email">Username or Email</label>
              </div>
              <div class="input" :class="{ active: isPasswordFocused || password }">
                <input
                    id="password"
                    type="password"
                    v-model="password"
                    @focus="focusInput('password')"
                    @blur="blurInput('password')"
                    required
                />
                <label for="password">Password</label>
              </div>
              <span class="checkbox remember">
                <input type="checkbox" id="remember" v-model="rememberMe" />
                <label for="remember" class="read-text">Remember me</label>
              </span>
              <button :disabled="!isLoginFormValid">Login</button>
            </form>
            <a href="javascript:void(0)" class="account-check" @click="toggleCard">
              Already have an account? <b>Sign in</b>
            </a>
          </div>

          <!-- 회원가입 카드 -->
          <div :class="['card', { hidden: isLoginVisible }]" id="register">
            <form @submit.prevent="handleRegister">
              <h1>Sign up</h1>
              <div class="input" :class="{ active: isRegisterEmailFocused || registerEmail }">
                <input
                    id="register-email"
                    type="email"
                    v-model="registerEmail"
                    @focus="focusInput('registerEmail')"
                    @blur="blurInput('registerEmail')"
                    required
                />
                <label for="register-email">Email</label>
              </div>
              <div class="input" :class="{ active: isRegisterPasswordFocused || registerPassword }">
                <input
                    id="register-password"
                    type="password"
                    v-model="registerPassword"
                    @focus="focusInput('registerPassword')"
                    @blur="blurInput('registerPassword')"
                    required
                />
                <label for="register-password">Password</label>
              </div>
              <div class="input" :class="{ active: isConfirmPasswordFocused || confirmPassword }">
                <input
                    id="confirm-password"
                    type="password"
                    v-model="confirmPassword"
                    @focus="focusInput('confirmPassword')"
                    @blur="blurInput('confirmPassword')"
                    required
                />
                <label for="confirm-password">Confirm Password</label>
              </div>
              <span class="checkbox remember">
                <input type="checkbox" id="terms" v-model="acceptTerms" required />
                <label for="terms" class="read-text"
                >회원가입을 <b>동의</b>합니다.</label
                >
              </span>
              <button :disabled="!isRegisterFormValid">Register</button>
            </form>
            <a href="javascript:void(0)" class="account-check" @click="toggleCard">
              Don't have an account? <b>Sign up</b>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import createSignInHandlers from "./SignIn.js"; // 경로 수정
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  setup() {
    // SignIn.js에서 핸들러와 상태 가져오기
    const {
      isLoginVisible,
      email,
      password,
      registerEmail,
      registerPassword,
      rememberMe,
      isEmailFocused,
      isPasswordFocused,
      isRegisterEmailFocused,
      isRegisterPasswordFocused,
      isLoginFormValid,
      isRegisterFormValid,
      toggleCard,
      focusInput,
      blurInput,
      handleLogin,
      handleRegister,
    } = createSignInHandlers({
      useRouter,
      useStore,
      ref,
      computed,
    });

    return {
      isLoginVisible,
      email,
      password,
      registerEmail,
      registerPassword,
      rememberMe,
      isEmailFocused,
      isPasswordFocused,
      isRegisterEmailFocused,
      isRegisterPasswordFocused,
      isLoginFormValid,
      isRegisterFormValid,
      toggleCard,
      focusInput,
      blurInput,
      handleLogin,
      handleRegister,
    };
  },
};
</script>

<style scoped>
@import "./SignIn.css"; /* 스타일 유지 */

</style>