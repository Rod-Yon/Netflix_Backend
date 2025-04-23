const { Router } = require('express');
const { media_controller } = require('../controllers/media_controller');

const media_router = Router();

media_router.get('/', media_controller.get_all_media);
media_router.get('/:id', media_controller.get_media_by_id);
media_router.post('/', media_controller.create_media);
media_router.put('/:id', media_controller.update_media);
media_router.delete('/:id', media_controller.delete_media);

module.exports = { media_router };