const api_key = process.env.API_KEY;
const api_url = 'https://api.themoviedb.org/3';

const api_fetch = async (path, query = '') => {

    const response = await fetch(`${api_url}${path}?api_key=${api_key}&language=en-EN${query}`);
    if (!response.ok) {
        throw new Error('API error');
    }

    return response.json();
};

const api_controller = {

    async get_popular_movies() {
        return api_fetch(`movie/popular`);
    },

    async get_newest_movies() {
        return api_fetch(`movie/now_playing`);
    },

    async get_movies_genres() {
        return api_fetch(`genre/movie/list`);
    },

    async get_movie(id) {
        return api_fetch(`movie/${id}`);
    },

    async get_movie_cast(id) {
        return api_fetch(`movie/${id}/credits`);
    },

    async get_popular_shows() {
        return api_fetch(`tv/popular`);
    },

    async get_newest_shows() {
        return api_fetch(`tv/now_playing`);
    },

    async get_shows_genres() {
        return api_fetch(`genre/tv/list`);
    },

    async get_show(id) {
        return api_fetch(`tv/${id}`);
    },

    async get_show_cast(id) {
        return api_fetch(`tv/${id}/credits`);
    }
};

module.exports = { api_controller };