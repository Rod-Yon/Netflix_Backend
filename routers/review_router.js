const express = require('express');
const review_controller = require('../controllers/review_controller');

const review_router = express.Router();

review_router.get('/', review_controller.get_all_reviews);
review_router.get('/media/:media_type/:media_id', review_controller.get_reviews_by_media);
review_router.get('/profile/:profile_id', review_controller.get_reviews_by_profile);
review_router.post('/', review_controller.create_review);
review_router.delete('/:review_id', review_controller.delete_review);
review_router.put('/:review_id', review_controller.update_review);

module.exports = { review_router };