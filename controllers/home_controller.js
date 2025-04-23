import { api_controller } from './api_controller'

const Media = require('../models/media');

const home_controller = {

    async get_billboard_media() {

        const [popular_movies, popular_shows, newest_movies, newest_shows] = await Promise.all([
            api_controller.get_popular_movies(),
            api_controller.get_popular_shows(),
            api_controller.newest_movies(),
            api_controller.newest_shows()
        ]);

        const extract_ids = list => list.map(item => item.id);
        const all_ids = [
            ...extract_ids(popular_movies),
            ...extract_ids(popular_shows),
            ...extract_ids(newest_movies),
            ...extract_ids(newest_shows)
        ];

        const db_media = await Media.find({ id: { $in: all_ids } });

        const get_top_from = (tmdb_list) => {
            for (const item of tmdb_list) {
                const found = db_media.find(media => media.id === item.id);
                if (found) return found;
            }
            return null;
        };

        const billboard = {
            popular_movie: get_top_from(popular_movies),
            popular_show: get_top_from(popular_shows),
            newest_movie: get_top_from(newest_movies),
            newest_show: get_top_from(newest_shows),
        };

        return billboard;
    }

}

module.exports = { home_controller };