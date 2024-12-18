import axios from "axios";
import MovieCard from "@/components/MovieCard.vue";
import { useToast } from "vue-toastification";

export default {
    components: {
        MovieCard,
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
            loading: true,
        };
    },
    async mounted() {
        const toast = useToast();
        this.apiKey = localStorage.getItem("apiKey");

        if (!this.apiKey) {
            toast.error("API Key가 없습니다. 로그인을 먼저 진행해주세요.");
            this.$router.push("/signin");
            return;
        }

        try {
            const popularResponse = await axios.get(
                `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=ko-KR&page=1`
            );
            this.featuredMovie = popularResponse.data.results[0];

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
            this.loading = false;
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
            console.log("Play Movie clicked!");
        },
        goToDetails(movieId) {
            this.$router.push({ name: "movie-details", params: { id: movieId } });
        },
    },
};