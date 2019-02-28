'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 4022;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/opiniones', {useNewUrlParser:true})
.then((err,res) => {
    console.log('Switched to opinionsDb');
    app.listen(port, () => {
        console.log('Node server and express are working!')
    });
})

.catch(err => console(err));