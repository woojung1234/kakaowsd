import { createStore } from "vuex";
import axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();

export default createStore({
  state: {
    isLoggedIn: false, // 로그인 상태
    apiKey: null, // TMDB API 키
    kakaoAccessToken: null, // 카카오 로그인 토큰
    user: null, // 카카오 사용자 정보
    popularMovies: [], // 인기 영화 목록
    movieDetails: null, // 선택된 영화의 상세 정보
    searchedMovies: [],
    genreMovies: [],
    genres: [],
  },
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
    user: (state) => state.user,
    apiKey: (state) => state.apiKey,
    popularMovies: (state) => state.popularMovies,
    movieDetails: (state) => state.movieDetails,
    searchedMovies: (state) => state.searchedMovies,
    genreMovies: (state) => state.genreMovies,
    genres: (state) => state.genres,
  },
  mutations: {
    SET_LOGIN_STATE(state, payload) {
      state.isLoggedIn = payload.isLoggedIn;
      state.apiKey = payload.apiKey;
      state.kakaoAccessToken = payload.kakaoAccessToken;
      state.user = payload.userl;
    },
    LOGOUT(state) {
      state.isLoggedIn = false;
      state.apiKey = null;
      state.kakaoAccessToken = null;
      state.user = null;
    },
    SET_POPULAR_MOVIES(state, movies) {
      state.popularMovies = movies;
    },
    SET_MOVIE_DETAILS(state, details) {
      state.movieDetails = details;
    },
    SET_SEARCHED_MOVIES(state, movies) {
      state.searchedMovies = movies;
    },
    SET_GENRE_MOVIES(state, movies) {
      state.genreMovies = movies;
    },
    SET_GENRES(state, genres) {
      state.genres = genres;
    },
    SET_API_KEY(state, apiKey) {
      state.apiKey = apiKey;
    },
    
  },
  actions: {
    // 로그인 액션: API 키 유효성 확인
    async kakaoLogin({ commit }, accessToken) {
      try {
        const response = await axios.get("https://kapi.kakao.com/v2/user/me", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
      
        const user = response.data;
        const nickname = user.properties?.nickname || "사용자"; // nickname 기본값 설정
        console.log("Kakao User Info:", user);
      
        commit("SET_LOGIN_STATE", {
          isLoggedIn: true,
          kakaoAccessToken: accessToken,
          user,
        });
      
        localStorage.setItem("kakaoAccessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("userName", nickname);
        toast.success(`Welcome, ${nickname}!`);
      } catch (error) {
        console.error("Kakao login failed:", error);
        localStorage.removeItem("kakaoAccessToken");
        toast.error("Failed to log in with Kakao. Please try again.");
        throw new Error("Kakao login failed");
      }
      
    },
  logout({ commit }) {
    commit("LOGOUT");

    // LocalStorage 초기화
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("kakaoAccessToken");
    localStorage.removeItem("user");

    toast.info("You have been logged out.");
  },
  // LocalStorage에서 로그인 상태 불러오기
  loadAuthState({ commit }) {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const kakaoAccessToken = localStorage.getItem("kakaoAccessToken");
    const user = JSON.parse(localStorage.getItem("user"));
    const apiKey = localStorage.getItem("apiKey"); // TMDB API Key
  
    if (isLoggedIn && kakaoAccessToken) {
      commit("SET_LOGIN_STATE", { isLoggedIn, kakaoAccessToken, user });
    }
  
    if (apiKey) {
      commit("SET_API_KEY", apiKey);
    } else {
      console.warn("API Key is missing. Redirecting to login page...");
      toast.error("API Key가 없습니다. 로그인을 진행해주세요.");
    }
  },

    // 영화 데이터 가져오기
    async fetchPopularMovies({ commit, state }) {
      try {
        if (!state.apiKey) {
          throw new Error("API Key is missing");
        }
        const response = await axios.get(
            "https://api.themoviedb.org/3/movie/popular",
            {
              params: {
                api_key: state.apiKey,
                language: "ko-KR",
                page: 1,
              },
            }
        );
        commit("SET_POPULAR_MOVIES", response.data.results);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
        toast.error("Failed to fetch movies. Please check your API Key.");
      }
    },
    async fetchMovieDetails({ commit, state }, movieId) {
      try {
        if (!state.apiKey) {
          throw new Error("API Key is missing");
        }
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${movieId}`,
            {
              params: {
                api_key: state.apiKey,
                language: "ko-KR",
              },
            }
        );
        commit("SET_MOVIE_DETAILS", response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        toast.error("Failed to fetch movie details. Please check your API Key.");
      }
    },
    async fetchSearchedMovies({ commit, state }, query) {
      try {
        if (!state.apiKey) {
          throw new Error("API Key is missing");
        }
        const response = await axios.get(
            "https://api.themoviedb.org/3/search/movie",
            {
              params: {
                api_key: state.apiKey,
                language: "ko-KR",
                query: query,
                page: 1,
              },
            }
        );
        commit("SET_SEARCHED_MOVIES", response.data.results);
      } catch (error) {
        console.error("Error fetching searched movies:", error);
        toast.error("Failed to fetch searched movies. Please check your API Key.");
      }
    },
    async fetchGenreMovies({ commit, state }, genreId) {
      try {
        if (!state.apiKey) {
          throw new Error("API Key is missing");
        }
        const response = await axios.get(
            "https://api.themoviedb.org/3/discover/movie",
            {
              params: {
                api_key: state.apiKey,
                language: "ko-KR",
                with_genres: genreId,
                page: 1,
              },
            }
        );
        commit("SET_GENRE_MOVIES", response.data.results);
      } catch (error) {
        console.error("Error fetching genre movies:", error);
        toast.error("Failed to fetch genre movies. Please check your API Key.");
      }
    },
    async fetchGenres({ commit, state }) {
      try {
        if (!state.apiKey) {
          throw new Error("API Key is missing");
        }
        const response = await axios.get(
            "https://api.themoviedb.org/3/genre/movie/list",
            {
              params: {
                api_key: state.apiKey,
                language: "ko-KR",
              },
            }
        );
        commit("SET_GENRES", response.data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
        toast.error("Failed to fetch genres. Please check your API Key.");
      }
    },
  },
  modules: {},
});
