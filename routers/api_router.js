const { Router } = require('express');
const { api_controller } = require('../controllers/api_controller');

const api_router = new Router();

api_router.get('/movies', async (req, res) => {
    const data = await api_controller.get_popular_movies();
    res.json(data);
});

api_router.get('/movies/:id', async (req, res) => {
    const data = await api_controller.get_movie(req.params.id);
    res.json(data);
});

api_router.get('/movies/new', async (req, res) => {
    const data = await api_controller.get_newest_movies();
    res.json(data);
});

api_router.get('/movies/genres/:id', async (req, res) => {
    const data = await api_controller.get_movies_genres(req.params.id);
    res.json(data);
});

api_router.get('/movies/cast/:id', async (req, res) => {
    const data = await api_controller.get_movie_cast(req.params.id);
    res.json(data);
});

api_router.get('/shows', async (req, res) => {
    const data = await api_controller.get_popular_shows();
    res.json(data);
});

api_router.get('/shows/:id', async (req, res) => {
    const data = await api_controller.get_show(req.params.id);
    res.json(data);
});

api_router.get('/shows/new', async (req, res) => {
    const data = await api_controller.get_newest_shows();
    res.json(data);
});

api_router.get('/shows/genres/:id', async (req, res) => {
    const data = await api_controller.get_shows_genres(req.params.id);
    res.json(data);
});

api_router.get('/shows/cast/:id', async (req, res) => {
    const data = await api_controller.get_show_cast(req.params.id);
    res.json(data);
});

module.exports = { api_router };