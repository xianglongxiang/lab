var express = require('express');
var path = require('path');
var app = module.exports = express();
var setting = require('./config.js');
var fs = require('fs');
var routes = require('./routes');
var http = require('http');
var ejs = require('ejs');

/*
* 错误日志，和接入日志
* */
var accessLogfile = fs.createWriteStream('log/access.log',{flags:'a'});
var errorLogfile = fs.createWriteStream('log/error.log',{flags:'a'});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('port', process.env.PORT || 3000);
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);
//app.get('/home', routes.home);
app.get('/login',routes.login);


if(!module.parent){
  http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
  });
}


