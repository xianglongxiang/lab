/**
 * Created by zhan on 16/1/29.
 */
(function(win){
  var
    doc,
    init;
  doc = win.document;

  init =  function(container,postion,speed){
    var timer;
    var maxH;
    if(container.nodeName == "BODY"){
      maxH = doc.body.scrollHeight - win.innerHeight;
    }else{
      maxH = container.scrollHeight - container.clientHeight;
    }
    postion = postion > maxH ? maxH : postion;
    speed = (speed || 10);
    //设置定时器
    timer = setInterval(function(){
      var top = container.scrollTop;
      if(top < (postion - 10)){
        top = top + 10;
      }else if(top > postion + 10){
        top = top - 10;
      }else if(top >= (postion - 10) && top <= (postion + 10)){
        clearInterval(timer);
      }
      container.scrollTop = top;
    },speed);

  };
  win.roll = init;
}(window));