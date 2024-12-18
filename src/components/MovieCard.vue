<template>
  <div class="movie-card">
    <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" :alt="movie.title" @click="toggleWishlist" />
    <div v-if="isWishlisted" class="wishlist-icon" @click.stop="toggleWishlist">
      ★
    </div>
    <h3>{{ movie.title }}</h3>
  </div>
</template>

<script>
export default {
  props: {
    movie: Object,
  },
  data() {
    return {
      isWishlisted: false,
    };
  },
  created() {
    this.checkWishlistStatus();
  },
  methods: {
    toggleWishlist() {
      const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
      const index = wishlist.findIndex((item) => item.id === this.movie.id);

      if (index > -1) {
        wishlist.splice(index, 1);
        this.isWishlisted = false;
      } else {
        wishlist.push(this.movie);
        this.isWishlisted = true;
      }

      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      this.$emit('wishlist-updated'); // 부모에게 알림
    },
    checkWishlistStatus() {
      const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
      this.isWishlisted = wishlist.some((item) => item.id === this.movie.id);
    },
  },
};
</script>

<style scoped>

.movie-card {
  text-align: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* 트랜지션 효과 추가 */
}

.movie-card:hover {
  transform: scale(1.05); /* 살짝 확대 */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); /* 그림자 효과 추가 */
}

.movie-card img {
  width: 100%;
  border-radius: 10px;
  cursor: pointer;
}
.movie-card h3 {
  font-size: 13px;
  margin: 0px 0;
}
.movie-card p {
  font-size: 14px;
  color: #555;
}
.wishlist-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 13px;
  color: gold;
  cursor: pointer;
}
</style>
