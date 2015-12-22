var User = require('../db/db').User;
var crypto = require('crypto');
/*
 * 路由管理
 * */
exports.index = function(req, res){
  res.render('index');
}

exports.login = function (req,res) {
  res.jsonp('login.html',{ user: 'tobi' });
  res.set({
    'Content-Type': 'text/plain',
    'Content-Length': '123',
    'ETag': '12345'
  })
  res.status(200).sendFile('public/login.html');
}

exports.postLogin = function(req, res) {
  //生成口令的散列值
  var md5 = crypto.createHash('md5');
  var username = req.body.username;
  var password = req.body.password;
  password = md5.update(password).digest('base64');

  var query = {username: username};
  User.find(query,function(err, doc){    //count返回集合中文档的数量，和 find 一样可以接收查询条件。query 表示查询的条件
    if(err) console.log(err);
    console.log(doc);
    if(doc.length == 0){
      res.json({state:'-1'});
    }else if(doc[0].password != password){
      res.json({state:'-2'});
    }else if(doc[0].state == 0){
      res.json({state:'-4'});
    }else{
        req.session.user = doc[0];
        res.json({state:'1'});

    }
  });

};


exports.postRegister = function(req, res) {
  //生成口令的散列值
  var md5 = crypto.createHash('md5');
  var username = req.body.username;
  var password = req.body.password;
  password = md5.update(password).digest('base64');
  var query = {username: username};
  User.find(query,function(err, doc){    //count返回集合中文档的数量，和 find 一样可以接收查询条件。query 表示查询的条件
    if(err) console.log(err);
    console.log(doc);
    if(doc != ""){
      //用户已存在
      res.json({state:'-3'});
    }else{
      var user = new User({
        username: username,
        password: password,
      });
      user.save(function (err,doc) {
        if(err) console.log(err);
        console.log(doc);
        if(doc != ""){
          res.json({state:'1'});
        }
      });
    }
  });
};

exports.home = function(req, res){
  //console.log(req.session);
  if (req.session.user) {
    res.render('issue',{user:req.session.user});
  } else {
    res.redirect('/')
  }
}
exports.createIssue = function (req,res) {
  if (req.session.user) {
    console.log(req.session.user.username);
    console.log(req.body.title);
    console.log(req.body.md);
    console.log(req.body.preview);
  } else {
    res.redirect('/')
  }
}