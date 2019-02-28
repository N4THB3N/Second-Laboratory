'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var user_routes = require('./routes/user');
var survey_routes = require('./routes/survey');
var answer_routes = require('./routes/answer');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/v1', user_routes);
app.use('/v1', survey_routes);
app.use('/v1', answer_routes);

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

module.exports = app;