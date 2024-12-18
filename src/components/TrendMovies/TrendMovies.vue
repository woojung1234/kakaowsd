<template>
  <div class="trend-movies">
    <!-- 보기 형식 선택 (Table View 또는 무한 스크롤) -->
    <div class="view-options">
      <button @click="changeView('table')">Table View</button>
      <button @click="changeView('infinite')">Infinite Scroll</button>
    </div>

    <!-- Table View일 때 -->
    <div v-if="viewType === 'table'" class="movie-list table-view">
      <movie-card
          v-for="movie in paginatedMovies"
          :key="movie.id"
          :movie="movie"
      />
      <div class="pagination">
        <button @click="changePage('previous')" :disabled="page === 1">{{ page - 1 }}</button>
        <span>{{ page }}</span>
        <button @click="changePage('next')" :disabled="page * itemsPerPage >= totalResults">{{ page + 1 }}</button>
      </div>
    </div>

    <!-- 무한 스크롤일 때 -->
    <div
        v-if="viewType === 'infinite'"
        class="movie-list infinite-scroll"
        @scroll="loadMore"
        ref="scrollContainer"
    >
      <movie-card
          v-for="movie in movies"
          :key="movie.id"
          :movie="movie"
      />
      <div v-if="loading" class="loading">Loading...</div>
    </div>
    <!-- 무한 스크롤 모드에서만 보이는 "맨 위로" 버튼 -->
    <button
        v-if="viewType === 'infinite' "
        class="scroll-to-top"
        @click="scrollToTop"
    >
      ▲
    </button>
  </div>
</template>

<script src="./TrendMovies.js"></script>
<style src="./TrendMovies.css" scoped></style>
