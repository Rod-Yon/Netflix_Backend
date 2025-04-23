const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const profile_schema = new Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    profile_id: { type: Number, unique: true},
    avatar: { type: String, required: true },
    preferences: { type: Map, of: Number, default: {}, required: true },
    wishlist: { type: [{ type: Schema.Types.ObjectId, ref: 'Media' }], required: true, default: [] },
    reviews: { type: [{ type: Schema.Types.ObjectId, ref: 'Review' }], required: true, default: [] }
}, { collection: "Profile" });

profile_schema.plugin(AutoIncrement, { inc_field: 'profile_id' });
const Profile = model('Profile', profile_schema);

module.exports = Profile;