var User = require('../db/db').User;
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

exports.postlogin = function(req, res) {
  //生成口令的散列值
  //var md5 = crypto.createHash('md5');
  //var password = md5.update(req.body.password).digest('base64');
  var username = req.body.username;
  var password = req.body.password;

  var query = {username: username};
  User.find(query,function(err, doc){    //count返回集合中文档的数量，和 find 一样可以接收查询条件。query 表示查询的条件
    if(err) console.log(err);
    console.log(doc);
    if(doc == ""){
      res.json({state:'-1'});
    }else if(doc[0].password != password){
      res.json({state:'-2'});
    }else{
      res.redirect('/');
    }
  });



  //User.get(req.body.name, req.body.grade, function(err, user) {
  //  if (!user) {
  //    //req.flash('error', '用戶不存在');
  //    console.log("用户不存在");
  //    return res.redirect('/xxx');
  //  }
  //  if (user.password != password) {
  //    //req.flash('error', '用戶口令錯誤');
  //    console.log("用户密码错误"+ user.password + "but nide:"+ password);
  //    return res.redirect('/xxx');
  //  }
  //  req.session.user = user;
  //  console.log(req.session);
  //  console.log("登陆成功");
  //  res.redirect('/');
  //});
};


exports.postRegister = function(req, res) {
  //生成口令的散列值
  //var md5 = crypto.createHash('md5');
  //var password = md5.update(req.body.password).digest('base64');
  console.log(req);
  var username = req.body.username;
  var password = req.body.password;
  console.log(username);
  console.log(password);
  //var query = {username: username};
  //User.find(query,function(err, doc){    //count返回集合中文档的数量，和 find 一样可以接收查询条件。query 表示查询的条件
  //  if(err) console.log(err);
  //  console.log(doc);
  //  if(doc == ""){
  //    res.json({state:'-1'});
  //  }else if(doc[0].password != password){
  //    res.json({state:'-2'});
  //  }else{
  //    res.redirect('/');
  //  }
  //});
};