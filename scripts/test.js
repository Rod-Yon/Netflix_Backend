import dotenv from 'dotenv';
dotenv.config();

import fetch from 'node-fetch';
import mongoose from 'mongoose';
import pkg from '../models/media.js';
const { Media } = pkg;

const fetchData = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (!data || !data.results || data.results.length === 0) {
            throw new Error('No data found');
        }

        return data.results;
    } catch (error) {
        console.error(`Failed to fetch from ${url}:`, error.message);
        return [];
    }
};

const getMedia = async () => {
    const apiKey = process.env.API_KEY;
    
    const movieTopRatedUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`;
    const showTopRatedUrl = `https://api.themoviedb.org/3/tv/top_rated?api_key=${apiKey}`;
    const moviePopularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;
    const showPopularUrl = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`;
    
    const topRatedMovies = await fetchData(movieTopRatedUrl);
    const topRatedShows = await fetchData(showTopRatedUrl);
    const popularMovies = await fetchData(moviePopularUrl);
    const popularShows = await fetchData(showPopularUrl);

    console.log(topRatedMovies.slice(0, 4));
    console.log(topRatedShows.slice(0, 4));
    console.log(popularMovies.slice(0, 4));
    console.log(popularShows.slice(0, 4));
};

getMedia();