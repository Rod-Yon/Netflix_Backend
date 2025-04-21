const { Schema, model } = require('mongoose');

const profile_schema = new Schema({
    name: { type: String, required: true },
    avatar: { type: String, required: true }
}, { collection: "Profile" });

const Profile = model('Profile', profile_schema);

module.exports = Profile;