<template>
  <div class="search">
    <!-- 필터 및 검색 -->
    <div class="search-filters">
      <input v-model="query" @input="debouncedSearch" placeholder="영화 검색..." />
      <select v-model="selectedGenre" @change="applyFilters">
        <option value="">장르 선택</option>
        <option v-for="genre in genres" :key="genre.id" :value="genre.id">{{ genre.name }}</option>
      </select>
      <input
          type="number"
          v-model="minRating"
          @input="applyFilters"
          placeholder="최소 평점 (0 ~ 10)"
          min="0"
          max="10"
      />
      <input type="date" v-model="releaseDate" @change="applyFilters" />
      <button @click="resetFilters">필터 초기화</button>
    </div>

    <!-- 최근 검색어 -->
    <div class="recent-searches" v-if="recentSearches.length">
      <h4>최근 검색어</h4>
      <ul>
        <li v-for="search in recentSearches" :key="search" @click="applyRecentSearch(search)">
          {{ search }}
        </li>
      </ul>
    </div>

    <!-- 영화 목록 -->
    <div class="movie-list" ref="scrollContainer" @scroll="handleScroll">
      <div v-for="movie in filteredMovies" :key="movie.id" class="movie-card">
        <div class="poster-wrapper">
          <img
              :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
              :alt="movie.title"
              @click="toggleWishlist(movie)"
          />
          <span v-if="isInWishlist(movie)" class="wishlist-star">★</span>
        </div>
        <h3>{{ movie.title }}</h3>
      </div>
      <div v-if="loading" class="loading">로딩 중...</div>
    </div>
  </div>
</template>

<script src="./SearchMovies.js"></script>
<style src="./SearchMovies.css" scoped></style>