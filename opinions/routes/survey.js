'use strict'

var express = require('express');
var SurveyController = require('../controllers/survey');
var md_auth = require('../middlewares/authenticated');
var api = express.Router();

api.post('/newSurvey', md_auth.ensureAut, SurveyController.saveSurvey);
api.get('/listSurveys', md_auth.ensureAut, SurveyController.listSurvey);
api.put('/updateSurvey/:id', md_auth.ensureAut, SurveyController.updateSurvey);
api.put('/dropSurvey/:id', md_auth.ensureAut, SurveyController.dropSurvey);

module.exports = api;