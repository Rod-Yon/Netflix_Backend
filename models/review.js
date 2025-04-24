const { Schema, model } = require('mongoose');

const review_schema = new Schema({
    profile: { type: Schema.Types.ObjectId, ref: 'Profile', required: true },
    review_type: { type: String, required: true, enum: ['Private', 'Public'] },
    media_type: { type: String, required: true, enum: ['Movie', 'Show'] },
    media_id: { type: Number, required: true },
    rating: { type: Number, required: true },
    review: { type: String, required: true }
}, { collection: "Reviews" });

const Review = model('Review', review_schema);

module.exports = Review;