/**
 * Created by zhan on 15/12/17.
 * 数据库模型
 */

var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/lab');//；连接数据库
var Schema = mongoose.Schema;   //  创建模型

//// 链接错误
//db.on('error', function(error) {
//  console.log(error);
//});

//定义用户
var User = new Schema({
  username: String,
  password: String,
  state: { type: Number, default: 0 },
  addTime: { type: Date, default: Date.now }
}); //  定义了一个新的模型，但是此模式还未和users集合有关联

//定义评论
var Comment = new Schema({
  username: String,
  md:String,
  preview:String,
  commentime:{ type: Date, default: Date.now },
});
//定义用户模型
var Issue = new Schema({
  master: String,
  title: String,
  md:String,
  preview:String,
  comment: [Comment],
  createtime: { type: Date, default: Date.now }
});

var SubmitDoc = new Schema({
  username: String,
  md:String,
  submittime:{ type: Date, default: Date.now },
});

var Doc = new Schema({
  master: String,
  title: String,
  md:String,
  submitdoc: [SubmitDoc],
  savetime:{ type: Date, default: Date.now },
  createtime: { type: Date, default: Date.now }
});

exports.User = db.model('users', User); //  与users集合关联
exports.Issue = db.model('issues', Issue); //  与users集合关联
exports.Doc = db.model('docs', Doc); //  与users集合关联
