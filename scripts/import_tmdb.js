import dotenv from 'dotenv';
dotenv.config();

import fetch from 'node-fetch';
import mongoose from 'mongoose';
import Media from '../models/media.js';

const TMDB_API_KEY = process.env.API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const endpoints = [
    { type: 'Movie', category: 'top_rated', label: 'Top Rated Movies' },
    { type: 'Show', category: 'top_rated', label: 'Top Rated Shows' },
    { type: 'Movie', category: 'popular', label: 'Popular Movies' },
    { type: 'Show', category: 'popular', label: 'Popular Shows' },
    { type: 'Movie', category: 'now_playing', label: 'Newest Movies' },
    { type: 'Show', category: 'airing_today', label: 'Newest Shows' }
];

async function fetchAndSaveMedia({ type, category }) {
    const mediaType = type === 'Movie' ? 'movie' : 'tv';
    const pageLimit = 3;
    const collectedItems = [];

    try {
        for (let page = 1; page <= pageLimit; page++) {
            const url = `${BASE_URL}/${mediaType}/${category}?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`;
            const response = await fetch(url);
            const data = await response.json();

            if (!data.results) {
                console.warn(`No results for ${type} - ${category} on page ${page}`);
                break;
            }

            collectedItems.push(...data.results);
        }

        const items = collectedItems.slice(0, 50);

        for (const item of items) {
            const exists = await Media.findOne({ tmdb_id: item.id, type });
            if (exists) continue;

            const mediaDoc = new Media({
                tmdb_id: item.id,
                type,
                name: item.title || item.name,
                poster_path: item.poster_path,
                description: item.overview,
                reviews: []
            });

            await mediaDoc.save();
        }

        console.log(`✓ Saved ${items.length} ${type.toLowerCase()}s from ${category}`);
    } catch (error) {
        console.error(`✗ Failed fetching ${type} - ${category}:`, error.message);
    }
}

async function run() {

    await mongoose.connect(process.env.DB_HOST, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    for (const endpoint of endpoints) {
        await fetchAndSaveMedia(endpoint);
    }

    mongoose.disconnect();
}

run();