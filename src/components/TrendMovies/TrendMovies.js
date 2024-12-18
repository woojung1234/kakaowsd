import axios from 'axios';
import MovieCard from "@/components/MovieCard.vue";

export default {
    components: { MovieCard },
    data() {
        return {
            viewType: 'table',  // 초기 화면은 Table View
            movies: [],          // 전체 영화 목록
            page: 1,             // 현재 페이지
            loading: false,      // 로딩 상태
            itemsPerPage: 20,    // 페이지당 영화 개수
            totalResults: 0,     // 전체 영화 수
            isScrolled: false,   // 스크롤 버튼 표시 여부
        };
    },
    mounted() {
        this.calculateItemsPerPage();
        window.addEventListener("resize", this.calculateItemsPerPage);

        if (this.$refs.scrollContainer) {
            this.$refs.scrollContainer.addEventListener("scroll", this.checkScroll);
        }
        this.fetchMovies();
    },
    beforeUnmount() {
        if (this.$refs.scrollContainer) {
            this.$refs.scrollContainer.removeEventListener("scroll", this.checkScroll);
        }
    },
    computed: {
        paginatedMovies() {
            const startIndex = (this.page - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.movies.slice(startIndex, endIndex);
        },
    },
    methods: {
        calculateItemsPerPage() {
            const cardHeight = 320;
            const cardWidth = 220;
            const headerHeight = 100;
            const paginationHeight = 50;
            const availableHeight = window.innerHeight - headerHeight - paginationHeight - 50;
            const availableWidth = window.innerWidth - 50;

            const rows = Math.floor(availableHeight / cardHeight);
            const cols = Math.floor(availableWidth / cardWidth);

            this.itemsPerPage = rows * cols;
        },
        async fetchMovies() {
            const apiKey = '1cc6831125c4a1baf8f809dc1f68ec14';
            try {
                this.loading = true;
                const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR&page=${this.page}`);
                if (this.page === 1) {
                    this.movies = response.data.results;
                } else {
                    this.movies.push(...response.data.results);
                }
                this.totalResults = response.data.total_results;
            } catch (error) {
                console.error('영화 데이터를 가져오는 데 오류가 발생했습니다.', error);
            } finally {
                this.loading = false;
            }
        },
        toggleWishlist(movie) {
            const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
            const movieIndex = wishlist.findIndex(item => item.id === movie.id);

            if (movieIndex === -1) {
                wishlist.push(movie);
            } else {
                wishlist.splice(movieIndex, 1);
            }
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
        },
        changeView(type) {
            this.viewType = type;
            this.page = 1;
            this.movies = [];
            this.fetchMovies();
        },
        changePage(direction) {
            if (direction === 'previous' && this.page > 1) {
                this.page--;
            } else if (direction === 'next' && this.page * this.itemsPerPage < this.totalResults) {
                this.page++;
            }
            this.fetchMovies();
        },
        loadMore() {
            if (!this.loading) {
                this.page++;
                this.fetchMovies();
            }
        },
        scrollToTop() {
            const container = this.$refs.scrollContainer;
            container.scrollTo({ top: 0, behavior: "smooth" });
        },
        checkScroll() {
            const container = this.$refs.scrollContainer;
            this.isScrolled = container.scrollTop > 300;
        },
    },
};
