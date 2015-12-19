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