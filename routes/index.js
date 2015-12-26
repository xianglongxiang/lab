var db = require('../db/db');
var crypto = require('crypto');
var formidable = require('formidable');
var fs = require('fs');  //node.js核心的文件处理模块

var User = db.User;
var Issue = db.Issue;
var Doc = db.Doc;
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
  }else{
    res.redirect('/');
  }
};

exports.getIssueItem = function (req, res) {
  if(req.session.user && req.query.id) {
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
  }else{
    res.redirect('/');
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
  }else{
    res.redirect('/');
  }
};

exports.createDoc = function (req,res) {
  var username = req.session.user.username;
  var md = req.body.md;
  if (username) {
    console.log();
    console.log(req.body.md);
    var doc = new Doc({
      master:username,
      title:req.body.title,
      md:md,
      submitdoc:[{username:username,md:md}]
    });

    doc.save(function (err,doc) {
      console.log(doc);
      if(err) {
        console.log(doc);
        res.json({state:-1});
      }
      if(doc){
        res.json({state:1,doc:doc});
      }else{
        res.json({state:-1})
      }
    });
  } else {
    res.redirect('/');
  }
}

exports.getdocs = function (req,res) {
  if(req.session.user) {
    var query = {title:1,md:1,master:1,createtime:1,savetime:1};

    Doc.find({},query,{sort:{createtime:-1}},function (err, doc) {
      res.render('docs',{user:req.session.user,docs:doc});
    });
  }else{
    res.redirect('/');
  }
}

exports.getdoc = function (req,res) {
  if(req.session.user && req.query.id) {
    var query = {title:1,md:1,master:1,createtime:1,savetime:1};
    Doc.findOne({_id:req.query.id},query, function (err,doc) {
      console.log(doc);
      res.render('doc',{user:req.session.user,doc:doc});
    });
  }else{
    res.redirect('/');
  }
}

exports.submitDoc = function (req, res) {
  var user = req.session.user;
  if(user){
    var submitdoc = {
      username:user.username,
      md:req.body.md,
    };
    console.log(submitdoc);

    Doc.findOne({_id:req.body.id},function(err,doc){
      console.log(doc)
      doc.submitdoc.push(submitdoc);
      doc.md = req.body.md;
      doc.savetime = Date.now();
      doc.save(function (err,doc) {
        console.log(doc);
        if(err){
          console.log(err);
          res.json({state:-1});
        }else{
          res.json({state:1,date:Date.now()});
        }

      });
    });
  }else{
    res.redirect('/');
  }
};

exports.getfile = function (req,res) {
  res.render('files');
}

exports.upload = function(req, res, next){
  var message = '';
  console.log('123');

  var form = new formidable.IncomingForm();   //创建上传表单
  form.encoding = 'utf-8';        //设置编辑
  form.uploadDir = 'public/upload/';     //设置上传目录
  form.keepExtensions = true;     //保留后缀
  form.maxFieldsSize = 2 * 1024 * 1024;   //文件大小

  form.parse(req, function(err, fields, files) {
    if (err) {
      console.log(err);
    }

    var filename = files.resource.name;
    console.log(filename);

    // 对文件名进行处理，以应对上传同名文件的情况
    var nameArray = filename.split('.');
    var type = nameArray[nameArray.length-1];
    var name = '';
    for(var i=0; i<nameArray.length-1; i++){
      name = name + nameArray[i];
    }
    var rand = Math.random()*100 + 900;
    var num = parseInt(rand, 10);

    var avatarName = name + num +  '.' + type;

    var newPath = form.uploadDir + avatarName ;
    fs.renameSync(files.resource.path, newPath);  //重命名
  });
};

exports.download = function(req, res){
  var path = 'public/upload/file.txt';  // 文件存储的路径

  // filename:设置下载时文件的文件名，可不填，则为原名称
  res.download(filepath, filename);
};

exports.logout = function (req,res) {
  req.session.user = null;
  res.redirect('/');
};