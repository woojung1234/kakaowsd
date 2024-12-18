<template>
  <div class="wishlist">
    <h1>위시리스트</h1>
    <div v-if="movies.length > 0" class="movie-list">
      <movie-card
          v-for="movie in movies"
          :key="movie.id"
          :movie="movie"
          @wishlist-updated="loadWishlist"
      />
    </div>
    <div v-else>
      <p>찜한 영화가 없습니다.</p>
    </div>
  </div>
</template>

<script>
import MovieCard from "@/components/MovieCard.vue";

export default {
  components: { MovieCard },
  data() {
    return {
      movies: [],
    };
  },
  created() {
    this.loadWishlist();
  },
  methods: {
    loadWishlist() {
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      this.movies = wishlist;
    },
  },
};
</script>

<style scoped>
.wishlist {
  text-align: center;
}
.movie-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
