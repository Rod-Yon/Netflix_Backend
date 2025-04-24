const Review = require('../models/review');
const mongoose = require('mongoose');

const review_controller = {

    async get_all_reviews(req, res) {

        try {
            const reviews = await Review.find().populate('profile');
            
            res.status(200).json(reviews);

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async get_reviews_by_media(req, res) {

        const { media_id, media_type } = req.params;

        try {

            const reviews = await Review.find({ media_id, media_type }).populate('profile');

            res.status(200).json(reviews);

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async get_reviews_by_profile(req, res) {

        const { profile_id } = req.params;

        try {

            const reviews = await Review.find({ profile: profile_id }).populate('profile');

            res.status(200).json(reviews);

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async create_review(req, res) {

        try {

            const review = new Review(req.body);

            await review.save();
            res.status(201).json(review);

        } catch (error) {

            res.status(400).json({ error: error.message });
        }
    },

    async delete_review(req, res) {

        const { review_id } = req.params;

        try {

            const result = await Review.findByIdAndDelete(review_id);

            if (!result) return res.status(404).json({ message: 'Review not found' });
            res.status(200).json({ message: 'Review deleted successfully' });

        } catch (error) {

            res.status(500).json({ error: error.message });
        }
    },

    async update_review(req, res) {

        const { review_id } = req.params;

        try {

            const updated = await Review.findByIdAndUpdate(review_id, req.body, { new: true, runValidators: true });

            if (!updated) return res.status(404).json({ message: 'Review not found' });
            res.status(200).json(updated);

        } catch (error) {

            res.status(400).json({ error: error.message });
        }
    }
};

module.exports = review_controller;