/**
 * Created by zhan on 16/1/29.
 */
(function(win){
  var
    doc,
    rolling,
    init;
  doc = win.document;

  rolling = function(container){
    container.scrollTop = container.scrollTop + 1;
  };
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
      if(container.scrollTop < (postion - 10)){
        container.scrollTop = container.scrollTop + 10;
      }else if(container.scrollTop > postion + 10){
        container.scrollTop = container.scrollTop - 10;
      }else if(container.scrollTop >= (postion - 10) && container.scrollTop <= (postion + 10)){
        clearInterval(timer);
      }
    },speed);

  };
  win.roll = init;
}(window));