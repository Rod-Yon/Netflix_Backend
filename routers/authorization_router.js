const { Router } = require('express');
const { authorization_controller } = require('../controllers/authorization_controller');

const authorization_router = new Router();

authorization_router.post('/', authorization_controller.authorization);

module.exports = { authorization_router };