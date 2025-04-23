const { Schema, model } = require('mongoose');

const media_schema = new Schema({
    tmdb_id: { type: Number, required: true },
    type: { type: String, required: true, enum: ['Movie', 'Show'] },
    name: { type: String, required: true },
    poster_path: { type: String, required: true },
    description: { type: String, required: true },
    reviews: { type: [{ type: Schema.Types.ObjectId, ref: 'Review' }], required: true, default: [] }
}, { collection: "Medias" });

const Media = model('Media', media_schema);

module.exports = Media;