'use strict'

var express = require('express');
var UserController = require('../controllers/user');
var md_auth = require('../middlewares/authenticated');
var api = express.Router();

api.post('/newUser', UserController.saveUser);
api.post('/Login', UserController.login);
api.get('/listUser', UserController.listUser);
api.put('/updateUser/:id', md_auth.ensureAut, UserController.updateUser);
api.put('/dropUser/:id', md_auth.ensureAut, UserController.dropUser);

module.exports = api;