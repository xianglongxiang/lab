!function(t,e){"use strict";function n(t,e,n,s){function r(t,e,n){var s,r=t.querySelectorAll(e);for(s=0;s<r.length;s++)if(r[s]===n)return!0}t.addEventListener(e,function(e){for(var i=e.target,a=e.currentTarget,o=!0;o&&i!==a;)return r(t,n,i)&&(o=s.call(i,e)),i=i.parentNode,o},!1)}function s(t){return Array.isArray(t)}var r=t,i=e,a=function(t){return a.prototype.init(t)};a.prototype={constructor:a,length:0,splice:[].splice(),selector:"",init:function(t){var e,n;if(!t)return this;if("object"==typeof t){for(t=[t],n=0;n<t.length;n+=1)this[n]=t[n];return this.length=t.length,this}if("function"==typeof t)return void a.ready(t);if(t=t.trim(),"#"!==t.charAt(0)||t.match("\\s")){if("."===t.charAt(0)){for(t=t.substring(1),e=i.getElementsByClassName(t),n=0;n<e.length;n++)this[n]=e[n];return this.selector=t,this.length=e.length,this}for(e=i.querySelectorAll(t),n=0;n<e.length;n++)this[n]=e[n];return this.selector=t,this.length=e.length,this}return t=t.substring(1),e=i.getElementById(t),this.selector=t,this.length=1,this[0]=e,this},css:function(t,e){var n;for(n=0;n<this.length;n++)if("string"==typeof t){if(1===arguments.length)return getComputedStyle(this[n],null)[t];this[n].style[t]=e}else{var s=this[n];r.zf.each(t,function(t,e){r.console.log(this),s.style.cssText+=""+t+":"+e+";"})}return this},hasClass:function(t){for(var e=new RegExp("(\\s|^)"+t+"(\\s|$)"),n=0;n<this.length;n++)if(this[n].className.match(e))return!0;return!1},addClass:function(t){for(var e=new RegExp("(\\s|^)"+t+"(\\s|$)"),n=0,s=this.length;s>n;n++)this[n].className.match(e)||(this[n].className?this[n].className+=" "+t:this[n].className+=t);return this},removeClass:function(t){for(var e=new RegExp("(\\s|^)"+t+"(\\s|$)"),n=new Array,s=0,r=this.length;r>s;s++)this[s].className.match(e)&&(n=this[s].className.split(" "),n.length>1?this[s].className=this[s].className.replace(" "+t,""):this[s].className=this[s].className.replace(t,""));return this},bind:function(t,e){if(i.addEventListener)for(var n=0;n<this.length;n++)this[n].addEventListener(t,e,!1);else if(i.attachEvent)for(var n=0;n<this.length;n++)this[n].attachEvent(t,e);return this}},a.each=function(t,e){var n,i,a=t.length,o=t.constructor;if(o===r.zf)for(n=0;a>n&&(i=e.call(t[n],n,t[n]),i!==!1);n++);else if(s(t))for(n=0;a>n&&(i=e.call(t[n],n,t[n]),i!==!1);n++);else for(n in t)if(i=e(n,t[n]),i===!1)break},a.getWidth=function(){return i.body.clientWidth+i.body.scrollLeft},a.getHeight=function(){return i.body.clientHeight+i.body.scrollTop},a.ready=function(t){i.addEventListener("DOMContentLoaded",function(){t&&t()},!1),i.removeEventListener("DOMContentLoaded",t,!0)},a.dele=n,a.ajax=function(t){function e(){if("undefined"!=typeof XMLHttpRequest)return new XMLHttpRequest;if("undefined"!=typeof ActiveXObject){if("string"!=typeof arguments.callee.activeXString){var t,e,n=["MSXML2.XMLHttp.6.0","MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"];for(t=0,e=n.length;e>t;t++)try{new ActiveXObject(n[t]),arguments.callee.activeXString=n[t];break}catch(s){}}return new ActiveXObject(arguments.callee.activeXString)}throw new Error("No XHR object available")}function n(e,n){var r="success";t.success&&t.success(e,t,r,n),s(r)}function s(e){t.complete&&t.complete(e)}var i,a={url:!1,type:"GET",data:!1,success:!1,complete:!1},o=e();for(i in a)void 0===t[i]&&(t[i]=a[i]);o.open(t.type,t.url),o.onreadystatechange=function(){if(4===o.readyState){var t,e=o.status;e>=200&&300>e||304===e?(t=o.responseText,t=r.JSON?JSON.parse(t):r.eval("("+t+")"),n(t,o)):r.console.log("ERR",o.status)}},"POST"==t.type&&o.setRequestHeader("Content-Type","application/json"),o.send(t.data?JSON.stringify(t.data):null)},a.prototype.init.prototype=a.prototype,r.zf=a}(window,document);
//# sourceMappingURL=zf.js.map