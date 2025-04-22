const { Schema, model } = require('mongoose');

const profile_schema = new Schema({
    name: { type: String, required: true },
    avatar: { type: String, required: true },
    preferences: { type: Map, of: Number, default: {}, required: true },
    wishlist: { type: [{ type: Schema.Types.ObjectId, ref: 'Media' }], required: true, default: [] },
    reviews: { type: [{ type: Schema.Types.ObjectId, ref: 'Review' }], required: true, default: [] }
}, { collection: "Profile" });

const Profile = model('Profile', profile_schema);

module.exports = Profile;