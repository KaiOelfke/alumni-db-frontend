'use strict';

var express = require('express');

var app = module.exports = express();

app.use(express.static(__dirname));

// This will ensure that all routing is handed over to AngularJS
app.get('*', function(req, res){
    res.sendfile('index.html');
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log("Listening on port " + port);