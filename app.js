var express = require('express');
var path = require('path');
var app = module.exports = express();
var config = require('./config.js');
var fs = require('fs');
var routes = require('./routes');
var ejs = require('ejs');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session'); //如果要使用session，需要单独包含这个模块
var RedisStore = require('connect-redis')(session);
var server = require('http').createServer(app)
var io = require('socket.io').listen(server);

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

app.use(logger({stream:accessLogfile}));
app.use(express.static(path.join(__dirname, 'public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// 设置 Cookie
app.use(cookieParser('zhanfang'));

// 设置 Session
app.use(session({
  store: new RedisStore({
    host: config.host,
    port: config.port,
    //db: 'lab',//这个设置有问题
    ttl:config.time
  }),
  resave:false,
  saveUninitialized:false,
  secret: 'keyboard cat'
}))


app.get('/', routes.index);
app.post('/register',routes.postRegister);
app.post('/login',routes.postLogin);
app.get('/home',routes.home);
app.post('/createIssue',routes.createIssue);
app.get('/issues',routes.getIssues);
app.get('/issue',routes.getIssueItem);
app.post('/comment',routes.addComment);
app.get('/logout',routes.logout);
app.get('/doc',routes.getdoc);

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

if(!module.parent){
  server.listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
  });
}



