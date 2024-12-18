import { createStore } from "vuex";
import axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();

export default createStore({
  state: {
    isLoggedIn: false, // 로그인 상태
    apiKey: null, // 로그인된 사용자의 API 키
    user: null,
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
      state.user = payload.user;
    },
    LOGOUT(state) {
      state.isLoggedIn = false;
      state.apiKey = null;
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
  },
  actions: {
    // 로그인 액션: API 키 유효성 확인
    async login({ commit }, { apiKey, user }) {
      try {
        // TMDB API 호출로 API 키 유효성 확인
        const response = await axios.get(
            "https://api.themoviedb.org/3/movie/popular",
            {
              params: {
                api_key: apiKey,
                language: "ko-KR",
                page: 1,
              },
            }
        );

        if (response.status === 200) {
          // API 키 유효 -> 로그인 성공
          commit("SET_LOGIN_STATE", { isLoggedIn: true, apiKey, user });
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("apiKey", apiKey);
          localStorage.setItem("user", JSON.stringify(user));
        }
      } catch (error) {
        toast.error("Invalid API Key. Please try again.");
        throw new Error("API Key is not valid");
      }
    },
    logout({ commit }) {
      commit("LOGOUT");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("apiKey");
      localStorage.removeItem("user");
    },
    loadAuthState({ commit }) {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      const apiKey = localStorage.getItem("apiKey");
      const user = JSON.parse(localStorage.getItem("user"));
      if (isLoggedIn && apiKey) {
        commit("SET_LOGIN_STATE", { isLoggedIn, apiKey, user });
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
