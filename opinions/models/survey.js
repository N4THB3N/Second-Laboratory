'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SurveySchema = Schema({
    title: String,
    q1: String,
    q2: String,
    q3: String,
    q4: String,
    user: {type:Schema.ObjectId, ref:'User'}
});

 module.exports = mongoose.model('Survey', SurveySchema);