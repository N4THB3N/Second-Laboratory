'use strict'

var express = require('express');
var AnswerController = require('../controllers/answer');
var md_auth = require('../middlewares/authenticated');
var api = express.Router();

api.post('/answer/:id', md_auth.ensureAut, AnswerController.saveAnswer);
api.get('/listAnswers', md_auth.ensureAut, AnswerController.listAnswer);
api.put('/updateAnswer/:id', md_auth.ensureAut, AnswerController.updateAnswer);
api.put('/dropAnswer/:id', md_auth.ensureAut, AnswerController.dropAnswer);

module.exports = api;