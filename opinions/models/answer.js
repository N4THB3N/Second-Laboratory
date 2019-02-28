'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnswerSchema = Schema({
    response: String,
    si: Number,
    no: Number,
    quiza: Number,
    user: {type:Schema.ObjectId, ref:'User'},
    survey: {type:Schema.ObjectId, ref:'Survey'}
});

 module.exports = mongoose.model('Answer', AnswerSchema);