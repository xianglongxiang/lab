var db = require('../db/db');
var crypto = require('crypto');
var User = db.User;
var Issue = db.Issue;
/*
 * 路由管理
 * */
exports.index = function(req, res){
  if(req.session.user){
    res.redirect('issues');
  }else{
    res.render('index');
  }

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
  var username = req.session.user.username;
  var md = req.body.md;
  var preview = req.body.preview;
  if (username) {
    console.log();
    console.log(req.body.md);
    console.log(req.body.preview);
    var issue = new Issue({
      master:username,
      title:req.body.title,
      md:md,
      preview:preview,
      comment:[{username:username,md:md,preview:preview}]
    });

    issue.save(function (err,doc) {
      if(err) {
        console.log(doc);
        res.json({state:-1,issue:doc});
      }
      if(doc){
        res.json({state:1,issue:doc});
      }else{
        res.json({state:-1})
      }
    });
  } else {
    res.redirect('/')
  }
}

exports.getIssues = function (req, res) {
  if(req.session.user) {
    var query = {title:1,md:1,preview:1,master:1,createtime:1};
    Issue.find({},query,function (err, doc) {
      res.render('issue',{user:req.session.user,issues:doc});
    });
  }
};

exports.getIssueItem = function (req, res) {
  if(req.session.user) {
    Issue.findOne({_id:req.query.id}, function (err,doc) {
      res.render('issueitem',{
        user:req.session.user,
        id:doc._id,
        title:doc.title,
        master:doc.master,
        createtime:doc.createtime,
        comments:doc.comment
      });
    });
  }
};

exports.addComment = function (req, res) {
  var user = req.session.user;
  if(user){
    var commentItem = {
      username:user.username,
      md:req.body.md,
      preview:req.body.preview
    };
    //console.log(commentItem);

    Issue.findOne({_id:req.body.id},function(err,issue){
      issue.comment.push(commentItem);
      issue.save(function (err,doc) {
        if(err){
          console.log(err);
          res.json({state:-1});
        }else{
          res.json({state:1,date:Date.now(),comment:commentItem});
        }

      });
    });
  }
};
  
exports.logout = function (req,res) {
  req.session.user = null;
  res.redirect('/');
};