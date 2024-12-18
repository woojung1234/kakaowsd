import axios from "axios";
import { debounce } from "lodash";
import { useToast } from "vue-toastification";

export default {
    data() {
        return {
            movies: [],
            allMovies: [],
            genres: [],
            selectedGenre: "",
            minRating: "",
            releaseDate: "",
            query: "",
            recentSearches: [],
            page: 1,
            loading: false,
            isEndOfData: false,
            apiKey: localStorage.getItem("apiKey"),
        };
    },
    created() {
        const toast = useToast();
        if (!this.apiKey) {
            toast.error("로그인 세션이 만료되었습니다. 다시 로그인해주세요.");
            this.$router.push("/signin");
            return;
        }
        this.debouncedSearch = debounce(this.searchMovies, 500);
        this.fetchGenres();
        this.loadInitialMovies();
        this.loadRecentSearches();
    },
    computed: {
        filteredMovies() {
            return this.movies.filter((movie) => {
                const matchesGenre =
                    !this.selectedGenre || movie.genre_ids.includes(parseInt(this.selectedGenre));
                const matchesRating =
                    !this.minRating || movie.vote_average >= parseFloat(this.minRating);
                const matchesReleaseDate =
                    !this.releaseDate || movie.release_date >= this.releaseDate;
                return matchesGenre && matchesRating && matchesReleaseDate;
            });
        },
    },
    methods: {
        loadRecentSearches() {
            const searches = JSON.parse(localStorage.getItem("recentSearches")) || [];
            this.recentSearches = searches;
        },
        saveSearchQuery(query) {
            if (!query.trim()) return;
            const updatedSearches = [query, ...this.recentSearches.filter((q) => q !== query)];
            this.recentSearches = updatedSearches.slice(0, 10);
            localStorage.setItem("recentSearches", JSON.stringify(this.recentSearches));
        },
        async fetchGenres() {
            const toast = useToast();
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/genre/movie/list?api_key=${this.apiKey}&language=ko-KR`
                );
                this.genres = response.data.genres;
            } catch (error) {
                console.error("장르 목록 가져오기 실패:", error);
                toast.error("장르 데이터를 불러오지 못했습니다.");
            }
        },
        async loadInitialMovies() {
            const toast = useToast();
            try {
                this.loading = true;
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=ko-KR&page=${this.page}`
                );
                this.allMovies = [...this.allMovies, ...response.data.results];
                this.movies = [...this.allMovies];
                if (response.data.results.length === 0) {
                    this.isEndOfData = true;
                }
            } catch (error) {
                console.error("초기 영화 데이터 로드 실패:", error);
                toast.error("영화 데이터를 불러오지 못했습니다.");
            } finally {
                this.loading = false;
            }
        },
        handleScroll() {
            const container = this.$refs.scrollContainer;
            if (
                container.scrollTop + container.clientHeight >= container.scrollHeight &&
                !this.loading &&
                !this.isEndOfData
            ) {
                this.page++;
                this.loadInitialMovies();
            }
        },
        applyFilters() {
            this.movies = this.allMovies;
        },
        resetFilters() {
            this.query = "";
            this.selectedGenre = "";
            this.minRating = "";
            this.releaseDate = "";
            this.applyFilters();
        },
        async searchMovies() {
            const toast = useToast();
            if (this.query.trim()) {
                this.saveSearchQuery(this.query);
                try {
                    const response = await axios.get(
                        `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.query}&language=ko-KR`
                    );
                    this.movies = response.data.results;
                } catch (error) {
                    console.error("영화 검색 오류:", error);
                    toast.error("검색 결과를 가져오지 못했습니다.");
                }
            } else {
                this.movies = this.allMovies;
            }
        },
        applyRecentSearch(query) {
            this.query = query;
            this.searchMovies();
        },
        toggleWishlist(movie) {
            let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
            const movieIndex = wishlist.findIndex((item) => item.id === movie.id);
            if (movieIndex === -1) {
                wishlist.push(movie);
            } else {
                wishlist.splice(movieIndex, 1);
            }
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
            this.movies = this.movies.map((m) => {
                if (m.id === movie.id) {
                    m.isInWishlist = !m.isInWishlist;
                }
                return m;
            });
        },
        isInWishlist(movie) {
            const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
            return wishlist.some((item) => item.id === movie.id);
        },
    },
};
