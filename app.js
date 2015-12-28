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

//app.use(logger({stream:accessLogfile}));
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
app.post('/createDoc',routes.createDoc);
app.get('/docs',routes.getdocs);
app.get('/doc',routes.getdoc);
app.post('/submitDoc',routes.submitDoc);
app.get('/file',routes.getfile);
app.post('/fileupload',routes.upload);
app.get('/download',routes.download);

// 房间用户名单
var roomInfo = {};

io.sockets.on('connection', function (socket) {

  var url = socket.request.headers.referer;
  var splited = url.split('=');
  var roomID = splited[splited.length - 1];   // 获取房间ID
  var user = '';

  socket.on('join', function (username) {
    user = username;

     //将用户昵称加入房间名单中
    if (!roomInfo[roomID]) {
      roomInfo[roomID] = [];
    }
    roomInfo[roomID].push(user);

    console.log(roomInfo);

    socket.join(roomID);    // 加入房间
    // 通知房间内人员
    //io.to(roomID).emit('sys', user + '加入了房间', roomInfo[roomID]);
  });

  // 接收用户消息,发送相应的房间
  socket.on('message', function (md) {
    // 验证如果用户不在房间内则不给发送
    if (roomInfo[roomID].indexOf(user) === -1) {
      return false;
    }
    console.log(md);
    //emit to 'room' except this socket client
    socket.broadcast.to(roomID).emit('md',user, md);
    //emit to all socket client in the room
    //io.to(roomID).emit('md', user, md);
  });

  //socket.emit('join', { connect: 'ok' });
  //socket.on('my other event', function (data) {
  //  console.log(data);
  //});
});

if(!module.parent){
  server.listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
  });
}



