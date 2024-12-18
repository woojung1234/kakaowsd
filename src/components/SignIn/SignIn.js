import axios from "axios";
import { useToast } from "vue-toastification";

export default function createSignInHandlers({ useRouter, useStore, ref, computed }) {
    const toast = useToast();
    const isLoginVisible = ref(true);
    const email = ref("");
    const password = ref("");
    const registerEmail = ref("");
    const registerPassword = ref("");
    const rememberMe = ref(false);
    const isEmailFocused = ref(false);
    const isPasswordFocused = ref(false);
    const isRegisterEmailFocused = ref(false);
    const isRegisterPasswordFocused = ref(false);

    const router = useRouter();
    const store = useStore();

    const isLoginFormValid = computed(() => email.value && password.value);
    const isRegisterFormValid = computed(() => registerEmail.value && registerPassword.value);

    const toggleCard = () => {
        isLoginVisible.value = !isLoginVisible.value;
    };

    const focusInput = (inputName) => {
        if (inputName === "email") isEmailFocused.value = true;
        if (inputName === "password") isPasswordFocused.value = true;
        if (inputName === "registerEmail") isRegisterEmailFocused.value = true;
        if (inputName === "registerPassword") isRegisterPasswordFocused.value = true;
    };

    const blurInput = (inputName) => {
        if (inputName === "email") isEmailFocused.value = false;
        if (inputName === "password") isPasswordFocused.value = false;
        if (inputName === "registerEmail") isRegisterEmailFocused.value = false;
        if (inputName === "registerPassword") isRegisterPasswordFocused.value = false;
    };

    // 로그인 함수
    const handleLogin = async () => {
        const toast = useToast();
        try {
            const response = await axios.get("https://api.themoviedb.org/3/movie/popular", {
                params: {
                    api_key: password.value,
                    language: "en-US",
                    page: 1,
                },
            });

            if (response.status === 200) {
                await store.dispatch("login", {
                    apiKey: password.value,
                    user: { email: email.value },
                });

                if (rememberMe.value) {
                    localStorage.setItem("email", email.value);
                }

                toast.success("반가워요!");
                router.push("/");
            }
        } catch (error) {
            toast.error("API 키가 아님.");
        }
    };

    // 회원가입 함수
    const handleRegister = async () => {
        try {
            const response = await axios.get("https://api.themoviedb.org/3/movie/popular", {
                params: {
                    api_key: registerPassword.value,
                    language: "en-US",
                    page: 1,
                },
            });

            if (response.status === 200) {
                if (localStorage.getItem(registerEmail.value)) {
                    toast.error("이미 등록됨.");
                    return;
                }

                localStorage.setItem(
                    registerEmail.value,
                    JSON.stringify({ password: registerPassword.value })
                );

                toast.success("회원가입 완료.");
                toggleCard();
            }
        } catch (error) {
            toast.error("API키가 아님.");
        }
    };


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
}