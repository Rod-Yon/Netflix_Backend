const { api_controller } = require('./api_controller');
const { media_controller } = require('./media_controller');

const get_data = async (media) => {
    const { tmdb_id, type } = media;

    try {
        let main_info, cast_data;

        if (type === 'Movie') {
            main_info = await api_controller.get_movie(tmdb_id);
            cast_data = await api_controller.get_movie_cast(tmdb_id);
        } else if (type === 'Show') {
            main_info = await api_controller.get_show(tmdb_id);
            cast_data = await api_controller.get_show_cast(tmdb_id);
        } else {
            return null;
        }

        const cast_names = cast_data.cast.map(actor => actor.name);

        return {
            main_info,
            cast: cast_names
        };

    } catch (err) {
        console.error(`Error in get_data for ${type} ID ${tmdb_id}:`, err.message);
        return null;
    }
};


const home_controller = {

    async get_billboard_media(req, res) {

        try {

            const all_media = await media_controller.get_all_media();

            const popular_movies = await api_controller.get_popular_movies();
            const popular_shows = await api_controller.get_popular_shows();

            const newest_movie = await media_controller.get_newest_movie();
            const newest_show = await media_controller.get_newest_show();

            const movies_id = popular_movies.results.map(media => media.id);
            const shows_id = popular_shows.results.map(media => media.id);

            let popular_movie;
            let popular_show;

            all_media.forEach((item) => {
                if (movies_id.includes(item.tmdb_id) && !popular_movie) {
                    popular_movie = item;
                }
                if (shows_id.includes(item.tmdb_id) && !popular_show) {
                    popular_show = item;
                }
            });


            const popular_movie_data = await get_data(popular_movie);
            const newest_movie_data = await get_data(newest_movie);
            const popular_show_data = await get_data(popular_show);
            const newest_show_data = await get_data(newest_show);

            const result = {
                popular_movie: popular_movie_data,
                newest_movie: newest_movie_data,
                popular_show: popular_show_data,
                newest_show: newest_show_data
            };

            res.status(200).json(result);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    },

    async get_top_ten(req, res) {

        try {

            const all_media = await media_controller.get_all_media();

            const popular_movies = await api_controller.get_popular_movies();
            const popular_shows = await api_controller.get_popular_shows();

            const movies_id = popular_movies.results.map(media => media.id);
            const shows_id = popular_shows.results.map(media => media.id);

            let popular_media = [];

            for (const item of all_media) {

                if (movies_id.includes(item.tmdb_id) || shows_id.includes(item.tmdb_id)) {
                    popular_media.push(item);
                }

                if (popular_media.length >= 10) break;
            }

            const result = await Promise.all(popular_media.map(media => get_data(media)));

            res.status(200).json(result);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    },

    async get_genre(req, res) {

        try {

            const requested_genre = req.params.genre.toLowerCase();
            
            const movies_genres = await api_controller.get_movies_genres();
            const shows_genres = await api_controller.get_shows_genres();
    

            const movie_genre_obj = movies_genres.genres.find(
                (g) => g.name.toLowerCase() === requested_genre
            );
            

            const show_genre_obj = shows_genres.genres.find(
                (g) => g.name.toLowerCase() === requested_genre
            );
    

            if (!movie_genre_obj && !show_genre_obj) {
                return res.status(404).json({ error: 'Genre not found' });
            }
    
            const movie_genre_id = movie_genre_obj ? movie_genre_obj.id : null;
            const show_genre_id = show_genre_obj ? show_genre_obj.id : null;
    

            const all_media = await media_controller.get_all_media();
            const popular_movies = await api_controller.get_popular_movies();
            const popular_shows = await api_controller.get_popular_shows();
    
            const filtered_media = [];
    

            for (const item of all_media) {
                if (movie_genre_id && popular_movies.results.some(
                    (movie) => movie.id === item.tmdb_id && movie.genre_ids.includes(movie_genre_id)
                )) {
                    filtered_media.push(item);
                }

                if (show_genre_id && popular_shows.results.some(
                    (show) => show.id === item.tmdb_id && show.genre_ids.includes(show_genre_id)
                )) {
                    filtered_media.push(item);
                }
    
                if (filtered_media.length >= 10) break;
            }

            const result = await Promise.all(filtered_media.map(media => get_data(media)));
    
            res.status(200).json(result);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        }
    }
};

module.exports = { home_controller };