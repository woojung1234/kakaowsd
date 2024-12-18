<template>
  <div class="home">
    <!-- 로딩 중 표시 -->
    <div v-if="loading" class="loading">
      데이터를 불러오는 중입니다...
    </div>

    <!-- 로딩이 끝난 후 콘텐츠 표시 -->
    <div v-else>
      <!-- 대표 영화 섹션 -->
      <div v-if="featuredMovie" class="featured-movie">
        <img
            :src="'https://image.tmdb.org/t/p/original' + featuredMovie.backdrop_path"
            :alt="featuredMovie.title"
            class="featured-image"
        />
        <div class="featured-info">
          <h1>{{ featuredMovie.title }}</h1>
          <p>{{ featuredMovie.overview }}</p>
          <div class="button-group">
            <!-- 재생 버튼 -->
            <button class="play-button" @click="playMovie">▶ 재생</button>
            <!-- 상세정보 버튼 -->
            <button
                class="details-button"
                @click="goToDetails(featuredMovie.id)"
            >
              상세정보
            </button>
          </div>
        </div>
      </div>

      <!-- 장르별 영화 섹션 -->
      <div class="genre-sections">
        <div
            v-for="(genre, index) in genres"
            :key="genre.name"
            class="genre-section"
            ref="genreSections"
        >
          <h2>{{ genre.name }}</h2>
          <div
              class="movie-slider"
              @wheel.prevent="handleScroll($event, index)"
          >
            <MovieCard
                v-for="movie in genre.movies"
                :key="movie.id"
                :movie="movie"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MovieCard from "@/components/MovieCard.vue"; // MovieCard 컴포넌트를 가져옵니다.
import axios from "axios"; // API 요청을 위한 axios
import { useToast } from "vue-toastification"; // 알림 메시지를 위한 Toast 사용

export default {
  components: {
    MovieCard, // 컴포넌트 등록
  },
  data() {
    return {
      featuredMovie: null,
      genres: [
        { name: "최신", endpoint: "now_playing", movies: [] },
        { name: "인기", endpoint: "popular", movies: [] },
        { name: "코믹", genreId: 35, movies: [] },
        { name: "액션", genreId: 28, movies: [] },
        { name: "로맨스", genreId: 10749, movies: [] },
      ],
      apiKey: null,
      loading: true, // 로딩 상태
    };
  },
  async mounted() {
    const toast = useToast(); // Toast 사용
    this.apiKey = localStorage.getItem("apiKey");

    if (!this.apiKey) {
      toast.error("API Key가 없습니다. 로그인을 먼저 진행해주세요.");
      this.$router.push("/signin");
      return;
    }

    try {
      // 대표 영화 데이터 로드
      const popularResponse = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=ko-KR&page=1`
      );
      this.featuredMovie = popularResponse.data.results[0];

      // 장르별 영화 데이터 로드
      for (let genre of this.genres) {
        const url = genre.endpoint
            ? `https://api.themoviedb.org/3/movie/${genre.endpoint}?api_key=${this.apiKey}&language=ko-KR&page=1`
            : `https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&with_genres=${genre.genreId}&language=ko-KR&page=1`;

        const response = await axios.get(url);
        genre.movies = response.data.results.slice(0, 20);
      }
    } catch (error) {
      console.error("영화 데이터를 불러오는 데 실패했습니다:", error.message);
      toast.error("영화 데이터를 불러오는 데 실패했습니다. 다시 시도해주세요.");
      this.$router.push("/signin");
    } finally {
      this.loading = false; // 로딩 상태 종료
    }
  },
  methods: {
    handleScroll(event, index) {
      const slider = this.$refs.genreSections[index].querySelector(
          ".movie-slider"
      );
      slider.scrollLeft += event.deltaY > 0 ? 100 : -100;
    },
    playMovie() {
      // 재생 기능은 여기에 구현
    },
    goToDetails(movieId) {
      this.$router.push({ name: "movie-details", params: { id: movieId } });
    },
  },
};
</script>