
//加入购物车弹窗方法
function msgbox(content,func,height,width){
    create_mask();
    create_msgbox(width,height,content);
}

function get_width(){
    return (document.body.clientWidth+document.body.scrollLeft);
}
function get_height(){
    return (document.body.clientHeight+document.body.scrollTop);
}
function get_left(w){
    var bw=document.body.clientWidth;
    var bh=document.body.clientHeight;
    w=parseFloat(w);
    return (bw/2-w/2+document.body.scrollLeft);
}
function get_top(h){
    var bw=document.body.clientWidth;
    var bh=document.body.clientHeight;
    h=parseFloat(h);
    return (bh/2-h/2+document.body.scrollTop);
}
function create_mask(){//创建遮罩层的函数
    var mask=document.createElement("div");
    mask.id="mask";
    mask.style.position="absolute";
    mask.style.filter="progid:DXImageTransform.Microsoft.Alpha(style=4,opacity=25)";//IE的不透明设置
    mask.style.opacity=0.4;//Mozilla的不透明设置
    mask.style.background="black";
    mask.style.top="0px";
    mask.style.left="0px";
    mask.style.width = get_width() + "px";
    mask.style.height = get_height() + "px";
    mask.style.minHeight = "800px";
    mask.style.zIndex = 10;
    mask.onclick = function(){
        removeCon();
    };
    document.body.appendChild(mask);
}
function create_msgbox(w,h,t){//创建弹出对话框的函数
    var box=document.createElement("div")	;
    box.id="msgbox";
    box.className = 'msg';
    box.style.position="fixed";
    box.style.top = (window.screen.availHeight - h)/2 + "px";
    box.style.left = (get_width() - w)/2 + "px";
    // box.style.width = w + "px";
    // box.style.height = h + "px";
    box.style.overflow="visible";
    box.innerHTML=t;
    box.style.zIndex=11;
    document.body.appendChild(box);
    re_pos();
}
function re_mask(){
    /*
     更改遮罩层的大小,确保在滚动以及窗口大小改变时还可以覆盖所有的内容
     */
    var mask=document.getElementById("mask")	;
    if(null==mask)return;
    mask.style.width = get_width()+"px";
    mask.style.height = get_height()+"px";
}
function re_pos(){
    /*
     更改弹出对话框层的位置,确保在滚动以及窗口大小改变时一直保持在网页的最中间
     */
    var box=document.getElementById("msgbox");
    if(null!=box){
        var w=box.style.width;
        var h=box.style.height;
        box.style.left=get_left(w)+"px";
        box.style.top=get_top(h)+"px";
    }
}
function removeCon(){
    /*
     清除遮罩层以及弹出的对话框
     */
    var mask=document.getElementById("mask");
    var msgbox=document.getElementById("msgbox");
    if(null == mask && null == msgbox)return;
    document.body.removeChild(mask);
    document.body.removeChild(msgbox);
}

function createIssue() {
    var title = $('#title')[0].value;
    var md = $("#lab-create-input")[0].value;
    var preview = markdown.toHTML(md);
    $.ajax({type:'POST',url:'/createIssue',dataType: "json",data:{
        title:title,
        md:md,
        preview:preview
    },success: function (data) {
      if(data.state == 1){
        window.location.href = '/issues';
      }else if(data.state == -1){
        alert("issue创建失败！");
      }
    }});
}


///*点击返回顶部*/
//$(window).scroll(function() {
//    if ($(this).scrollTop() > 50) {
//        $('#scrollUp').fadeIn();
//    } else {
//        $('#scrollUp').fadeOut();
//    }
//});
//// scroll body to 0px on click
//$('#scrollUp').click(function() {
//    $('#scrollUp').tooltip('hide');
//    $('body,html').animate({
//        scrollTop: 0
//    }, 200);
//    return false;
//});


