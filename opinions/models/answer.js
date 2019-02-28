'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnswerSchema = Schema({
    q1: String,
    q2: String,
    q3: String,
    q4: String,
    user: {type:Schema.ObjectId, ref:'User'},
    survey: {type:Schema.ObjectId, ref:'Survey'}
});

 module.exports = mongoose.model('Answer', AnswerSchema);