var express = require('express');
var app =module.exports = express();
var setting = require('./config.js');
var fs = require('fs');
var routes = require('./routes')

/*
* 错误日志，和接入日志
* */
var accessLogfile = fs.createWriteStream('log/access.log',{flags:'a'});
var errorLogfile = fs.createWriteStream('log/error.log',{flags:'a'});

//app.configure(function () {
//
//});

app.get('/', routes.index);
//app.get('/home', routes.home);

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});



