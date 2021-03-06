'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SurveySchema = Schema({
    title: String,
    question: String,
    user: {type:Schema.ObjectId, ref:'User'}
});

 module.exports = mongoose.model('Survey', SurveySchema);