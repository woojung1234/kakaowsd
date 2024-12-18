<template>
  <div class="movie-details" v-if="movie">
    <h1>{{ movie.title }}</h1>
    <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" :alt="movie.title" />
    <p>{{ movie.overview }}</p>
    <ul>
      <li><strong>평점:</strong> {{ movie.vote_average }}</li>
      <li><strong>개봉일:</strong> {{ movie.release_date }}</li>
    </ul>
  </div>
  <div v-else>
    <p>영화 정보를 불러오는 중입니다...</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      movieId: this.$route.params.id, // URL에서 영화 ID 가져오기
    };
  },
  computed: {
    ...mapGetters(['movieDetails']),
    movie() {
      return this.movieDetails; // Vuex에서 영화 상세 정보 가져오기
    },
  },
  methods: {
    ...mapActions(['fetchMovieDetails']),
  },
  async mounted() {
    await this.fetchMovieDetails(this.movieId); // 영화 상세 정보 요청
  },
};
</script>

<style scoped>
.movie-details {
  text-align: center;
}

.movie-details img {
  max-width: 300px;
  border-radius: 10px;
  margin: 20px 0;
}

.movie-details ul {
  list-style: none;
  padding: 0;
}

.movie-details li {
  margin: 10px 0;
}
</style>
