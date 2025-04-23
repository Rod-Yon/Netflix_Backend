const { Router } = require('express');
const { profile_controller } = require('../controllers/profile_controller');

const profile_router = new Router();

profile_router.get('/:username', profile_controller.get_profiles);
profile_router.post('/:username', profile_controller.create_new_profile);
profile_router.put('/', profile_controller.change_profile_name);

module.exports = { profile_router };