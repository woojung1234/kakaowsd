<template>
  <PopularMoviesTemplate />
</template>

<script>
import PopularMoviesTemplate from "@/components/PopularMovie/PopularCard.vue";
import PopularMoviesScript from "@/components/PopularMovie/PopularCard.js";
import "@/components/PopularMovie/PopularCard.css";

export default {
  components: {
    PopularMoviesTemplate,
  },
  mixins: [PopularMoviesScript],
};
</script>