zf.ready(function(){
  var width = document.documentElement.clientWidth;
  var height = width/1600 * 750 + "px";
  var container = document.getElementsByTagName("body")[0];
  document.querySelector('.lab-header').style.height = height;
  setTimeout(function () {
    zf('.logo').addClass('on');
    zf('.logo1').addClass('on1');
    zf('#login').addClass('on2');
    zf('#register').addClass('on2');
  },1500);


  var temp = "<div class='modal' style='border-radius: 10px;background:rgba(255,255,255,1)'><div class='modal-header' style='padding: 9px 15px;border-bottom: 1px solid #eee'><h3 style='margin:0'>登陆</h3></div><div class='modal-main' style='padding:15px'><input id='loginname' type='text' name='username' placeholder='用户名' style='display:block;width:25rem;margin: 10px 0px;padding: 6px 12px;border:1px solid #ccc;border-radius: 4px;'><input id='loginpass' type='password' name='password' placeholder='密码' style='display:block;width:25rem;margin: 10px 0px;padding: 6px 12px;border:1px solid #ccc;border-radius: 4px;'></div><div class='modal-footer' style='padding:14px 15px 15px;background-color: #f5f5f5;border-top:1px solid #ddd;box-shadow: inset 0 1px 0 #ffffff;border-bottom-left-radius:10px;border-bottom-right-radius:10px;overflow: hidden;'><button id='submit' class='btn-green' style='float: right' onclick='login()'>Submit</button><button id='close' class='btn-white' style='margin-right: 10px; float: right;' onclick='removeCon()'>Close</button></div></div>";

  var temp1 = "<div class='modal' style='border-radius: 10px;background:rgba(255,255,255,1)'><div class='modal-header' style='padding: 9px 15px;border-bottom: 1px solid #eee'><h3 style='margin:0'>注册</h3></div><div class='modal-main' style='padding:15px'><input id='username' type='text' name='username' placeholder='用户名' style='display:block;width:25rem;margin: 10px 0px;padding: 6px 12px;border:1px solid #ccc;border-radius: 4px;'><input id='password' type='password' name='password' placeholder='密码' style='display:block;width:25rem;margin: 10px 0px;padding: 6px 12px;border:1px solid #ccc;border-radius: 4px;'><input id='repassword' type='password' name='repassword' placeholder='确认密码' style='display:block;width:25rem;margin: 10px 0px;padding: 6px 12px;border:1px solid #ccc;border-radius: 4px;'></div><div class='modal-footer' style='padding:14px 15px 15px;background-color: #f5f5f5;border-top:1px solid #ddd;box-shadow: inset 0 1px 0 #ffffff;border-bottom-left-radius:10px;border-bottom-right-radius:10px;overflow: hidden;'><button id='submit' class='btn-green' style='float: right' onclick='register()'>Submit</button><button id='close' class='btn-white' style='margin-right: 10px; float: right;' onclick='removeCon()'>Close</button></div></div>";

  zf('#login').bind('click',function(){
    zfAlert(temp, '', 520, 456);
    zf('.msg').addClass('on3');
  });
  zf('#register').bind('click',function(){
    zfAlert(temp1, '', 520, 456);
    zf('.msg').addClass('on3');
  });

  //这个地方只能用a不能用li
  zf.dele(zf('#test')[0],'click','a',function(e){
    if(this.hash === '#head'){
      roll(container,0,5);
    } else if(this.hash === '#detail'){
      roll(container,611,5);
    } else if(this.hash === '#detail1'){
      roll(container,1111,5);
      //zf('.h3-1').addClass('h3-on');
      //zf('.img-1').addClass('img-on');
    } else if(this.hash === '#detail2'){
      roll(container,2501,5);
      //zf('.h3-2').addClass('h3-on');
      //zf('.img-2').addClass('img-on');
    } else if(this.hash === '#detail3'){
      roll(container,4091,5);
      //zf('.h3-3').addClass('h3-on');
      //zf('.img-3').addClass('img-on');
    }
  });

  window.addEventListener('scroll',function(){
    var topH = document.body.scrollTop;
    if(topH <= 600){
      if(!zf('#nav-one').hasClass('on')){
        zf('#nav-one').addClass('on');
        zf('#nav-two').removeClass('on');
        zf('#nav-four').removeClass('on');

        zf('.logo').addClass('on');
        zf('.logo1').addClass('on1');
        zf('#login').addClass('on2');
        zf('#register').addClass('on2');

        zf('.detail').removeClass('detail-on');
        zf('.h3-1').removeClass('h3-on');
        zf('.img-1').removeClass('img-on');
        zf('.h3-2').removeClass('h3-on');
        zf('.img-2').removeClass('img-on');
        zf('.h3-3').removeClass('h3-on');
        zf('.img-3').removeClass('img-on');
      }

    }else if(topH >= 600 && topH <= 1107){
      if(!zf('#nav-two').hasClass('on')){
        zf('#nav-two').addClass('on')
        zf('#nav-one').removeClass('on');
        zf('#nav-three').removeClass('on');

        zf('.detail').addClass('detail-on');
        zf('.logo').removeClass('on');
        zf('.logo1').removeClass('on1');
        zf('#login').removeClass('on2');
        zf('#register').removeClass('on2');
      }
    }else if(topH >= 1107 && topH <= 2498){
      if(!zf('#nav-three').hasClass('on')) {
        zf('#nav-two').removeClass('on');
        zf('#nav-three').addClass('on');
        zf('#nav-four').removeClass('on');

        zf('.detail').removeClass('detail-on');
        zf('.h3-2').removeClass('h3-on');
        zf('.img-2').removeClass('img-on');
        zf('.h3-3').removeClass('h3-on');
        zf('.img-3').removeClass('img-on');
        zf('.h3-1').addClass('h3-on');
        zf('.img-1').addClass('img-on');
      }

    }else if(topH >= 2498 && topH <= 4080){
      if(!zf('#nav-four').hasClass('on')){
        zf('#nav-three').removeClass('on');
        zf('#nav-four').addClass('on');
        zf('#nav-five').removeClass('on');

        zf('.h3-1').removeClass('h3-on');
        zf('.img-1').removeClass('img-on');
        zf('.h3-3').removeClass('h3-on');
        zf('.img-3').removeClass('img-on');
        zf('.h3-2').addClass('h3-on');
        zf('.img-2').addClass('img-on');
      }


    }else if(topH >= 4080){
      if(!zf('#nav-five').hasClass('on')){
        zf('#nav-four').removeClass('on');
        zf('#nav-five').addClass('on');

        zf('.h3-3').addClass('h3-on');
        zf('.img-3').addClass('img-on');
        zf('.h3-1').removeClass('h3-on');
        zf('.img-1').removeClass('img-on');
        zf('.h3-2').removeClass('h3-on');
        zf('.img-2').removeClass('img-on');
      }
    }
  });
});

function register(){
  var username = zf('#username')[0].value;
  var password = zf('#password')[0].value;
  var repassword = zf('#repassword')[0].value;
  if(repassword !== password){
    alert('确认密码和密码不相符！');
  }else{
    var data = {"username":username,"password":password};
    zf.ajax({url:'/register',type:'POST',data:data,success:function(data){
      if(data.state == -3){
        alert('用户已注册！');
      } else if(data.state == 1){
        alert('注册成功，请等待审核！');
      }
    }});
  }
}

function login(){
  var username = zf('#loginname')[0].value;
  var password = zf('#loginpass')[0].value;

  var data = {"username":username,"password":password};
  zf.ajax({url:'/login',type:'POST',data:data,success:function(data){
    if(data.state == -1){
      alert('用户不存在，请注册！');
    } else if(data.state == -2){
      alert('密码不正确，请重新输入');
    } else if(data.state == -4){
      alert('用户未通过审核，请联系管理员');
    } else if(data.state == 1){
      window.location.href = '/issues';
    }
  }});
}