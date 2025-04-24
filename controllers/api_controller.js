const api_key = process.env.API_KEY;
const api_url = 'https://api.themoviedb.org/3/';
const start_date = '2024-04-24';
const end_date = '2025-04-24';

const api_fetch = async (path, query = '') => {
    const url = `${api_url}${path}?api_key=${api_key}&language=en-EN${query}`;
    const response = await fetch(`${api_url}${path}?api_key=${api_key}&language=en-EN${query}`);

    if (!response.ok) {
        const errorText = await response.text(); // читаем тело ответа
        console.error(`Failed fetch from ${url}`);
        console.error(`Status: ${response.status} ${response.statusText}`);
        console.error(`Response: ${errorText}`);
        throw new Error('API error');
    }

    return response.json();
};

const api_controller = {

    async get_popular_movies() {
        return api_fetch(`movie/popular`);
    },

    async get_newest_movies() {
        return api_fetch('discover/movie', `&sort_by=primary_release_date.desc&primary_release_date.gte=${start_date}&primary_release_date.lte=${end_date}`);
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
        return api_fetch('discover/tv', `&sort_by=first_air_date.desc&first_air_date.gte=${start_date}&first_air_date.lte=${end_date}`);
    },

    async get_shows_genres() {
        return api_fetch(`genre/tv/list`);
    },

    async get_show(id) {
        return api_fetch(`tv/${id}`);
    },

    async get_show_cast(id) {
        return api_fetch(`tv/${id}/credits`);
    },

    async get_show_episodes(id) {
        return api_fetch(`tv/${id}/season/1`);
    },
};

module.exports = { api_controller };