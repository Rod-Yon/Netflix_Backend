const { Schema, model } = require('mongoose');

const user_schema = new Schema({
    login: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['User', 'Admin'] },
    profiles: { type: [{ type: Schema.Types.ObjectId, ref: 'Profile' }], required: true, default: [] }
}, { collection: "Users" });

const User = model('User', user_schema);

module.exports = User;