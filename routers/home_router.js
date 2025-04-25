const { Router } = require('express');
const { home_controller } = require('../controllers/home_controller');

const home_router = Router();

home_router.get('/:id/billboard', home_controller.get_billboard_media);
home_router.get('/:id/top/:type', home_controller.get_top_ten);
home_router.get('/:id/genre/:genre', home_controller.get_genre);
home_router.get('/:id/best', home_controller.get_top_rated);

module.exports = { home_router };