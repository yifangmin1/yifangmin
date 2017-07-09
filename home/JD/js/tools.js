// JavaScript Document

function documentReady(fn){
	if(document.addEventListener)document.addEventListener('DOMContentLoaded', fn, false);
	
	else{
		document.attachEvent('onreadystatechange', function (){
			if(document.readyState=='complete'){
				fn && fn();
			}
		});
	}
};
var hxsd_tools={

	"cleanSpace":function(elm) {
		for(var i=0; i<elm.childNodes.length; i++){   
			var node = elm.childNodes[i];
			if(node.nodeType==3 && !/\S/.test(node.nodeValue)) node.parentNode.removeChild(node);   
		}   
	},   

	"insertAfter":function (newEl, targetEl){
		var parentEl = targetEl.parentNode;//找到父级元素
		if(this.get_lastChild(parentEl) == targetEl) parentEl.appendChild(newEl);
		else parentEl.insertBefore(newEl,this.get_nextSibling(targetEl));
	},

	"get_firstChild":function(elm){
		var x=elm.firstChild;
		while (x.nodeType!=1) x=x.nextSibling;
		return x;
	},
	
	"get_lastChild":function(elm){
		var x=elm.lastChild;
		while (x.nodeType!=1) x=x.previousSibling;
		return x;
	},
	
	"get_previousSibling":function(elm){
		var x=elm.previousSibling;
		while (x.nodeType!=1)x=x.previousSibling;
		return x;
	},
	
	"get_nextSibling":function(elm){
		var x=elm.nextSibling;
		while (x.nodeType!=1) x=x.nextSibling;
		return x;
	},



	"offsetTop":function (elm){ 
		var top = elm.offsetTop; 
		var parent = elm.offsetParent; 
		while( parent != null ){ 
			top += parent.offsetTop; 
			parent = parent.offsetParent; 
		}; 
		return top; 
	}, 
	
	"offsetLeft":function(elm){ 
		var left = elm.offsetLeft; 
		var parent = elm.offsetParent; 
		while( parent != null ){ 
			left += parent.offsetLeft; 
			parent = parent.offsetParent; 
		}; 
		return left; 
	},

	"halfScreen":function(elm){
		var scroll_top=document.documentElement.scrollTop || document.body.scrollTop;
		var top=this.offsetTop(elm);
		var screen_h=document.documentElement.clientHeight;
		return top<scroll_top+screen_h/2 ? true : false;
	},
	
	"addEvent":function(obj,ev,fn){
		obj.attachEvent? obj.attachEvent('on'+ev,fn):obj.addEventListener(ev,fn,true);
	},
	
	"isParent":function (oParent,obj){
		while(obj){
			if(obj==oParent)return true;
			obj=obj.parentNode;
		}	
		return false;
	},

	"mouseenter":function (obj,fn){
		var _this=this;
		obj.onmouseover=function(ev){
			var oEv=ev||event;
			var formElm=oEv.formElm||oEv.relatedTarget;
			if( _this.isParent(this,formElm) ) return;
			fn && fn();
		};
	},
	"mouseleave":function (obj,fn){
		var _this=this;
		obj.onmouseout=function(ev){
			var oEv=ev||event;
			var toElm=oEv.toElm||oEv.relatedTarget;
			if( _this.isParent(this,toElm) ) return;
			fn && fn();
		};
	},
	"getByClass":function (oParent,cls){
		var arr=[];
		if(document.getElementsByClassName) return oParent.getElementsByClassName(cls);
		else{
			var aEl=oParent.getElementsByTagName('*');
			for(var i=0;i<aEl.length;i++){
				if(aEl[i].className.indexOf(cls)!=-1) arr.push(aEl[i]);
			}
		return arr;
		}
	},
	"addClass":function(obj, className){
		if(elm.length){
			for(var i=0; i<obj.length;i++){
				obj[i].className+=' '+className; 
			}
		}else{
			obj.className+=' '+className; 
		}
	},
	"removeClass":function (obj,className){
		if(obj.length){
			for(var i=0; i<obj.length;i++){
				obj[i].className=obj[i].className.replace(new RegExp(className,'g'),'');
			};
		}else{
			obj.className=obj.className.replace(new RegExp(className,'g'),'');
		};
	},
	
	"display_center":function(obj){
		obj.style.display="block";
		var l=(document.documentElement.clientWidth-obj.offsetWidth)/2;
		var t=(document.documentElement.clientHeight-obj.offsetHeight)/2;
		obj.style.left=l+'px';
		obj.style.top=t+'px';
		window.onresize=function(){
			hxsd_tools.display_center();
		}
	},
	"mouseWheel":function(obj,fn){
		if(window.navigator.userAgent.indexOf('Firefox')!=-1){	
			obj.addEventListener('DOMMouseScroll',wheelFn,false);
		}else obj.onmousewheel=wheelFn;
		
		function wheelFn(ev){
			var oEv=ev||event;
			var direct=oEv.wheelDelta ? oEv.wheelDelta<0 : oEv.detail>0;
			fn && fn(direct);
			if(window.event){
				oEv.returnValue = false; 
				return false;
			}
			else{
				oEv.preventDefault();
			}
		};
	},
	
	"drag":function(obj,title){
		title =title||obj;
		title.onmousedown=function(ev){
			var oEv=ev ||event;
			var disX=oEv.clientX-obj.offsetLeft;
			var disY=oEv.clientY-obj.offsetTop;
		
			document.onmousemove=function(ev){
				var oEv=ev ||event;
				var l=oEv.clientX-disX;
				var t=oEv.clientY-disY;
				
				if(l<0)l=0;
				if(t<0)t=0;
				if(l>document.documentElement.clientWidth-obj.offsetWidth) l=document.documentElement.clientWidth-obj.offsetWidth;
				if(t>document.documentElement.clientHeight-obj.offsetHeight) t=document.documentElement.clientHeight-obj.offsetHeight;
				obj.style.left=l+'px';
				obj.style.top=t+'px';
			};
			
			document.onmouseup=function(){
				document.onmouseup=document.onmousemove=null;
				if(obj.releaseCapture) obj.releaseCapture();
			}
			if(obj.setCapture) obj.setCapture();
			return false;
		};
	},

	"getStyle":function (obj, styleName){
		var value=obj.currentStyle ? obj.currentStyle[styleName]:getComputedStyle(obj,false)[styleName];
		return styleName=='opacity' ? value=Math.round(parseFloat(value)*100):value=parseInt(value);
	},
	
	"animate":function (obj,moveJson,speed,fn){
		var prd_speed={ 
			veryslow:	5000,
			slow:		2000,
			normal:		1000,
			fast:		700,
			veryfast:	300
		};
		
		if(speed){
			if(typeof stopTime=='string') speed=prd_speed[speed];
		}else{
			speed=prd_speed.normal;
		}
		
		var start={};
		var dis={};
		
		for(var key in moveJson){
			start[key]=this.getStyle(obj, key);
			dis[key]=moveJson[key]-start[key];
		}
		
		
		var count=parseInt(speed/30);
		var n=0;//步进
		
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			n++;
			for(var key in moveJson){
				var a=1-n/count;  
				var step_dis=start[key]+dis[key]*(1-a*a*a);
				
				if(key=='opacity'){
					obj.style.filter='alpha(opacity:'+step_dis+')';
					obj.style.opacity=step_dis/100;
				}
				else{
					obj.style[key]=step_dis+'px';
				}
			};
			
			if(n==count){
				clearInterval(obj.timer);
				fn && fn();
			};
		
		},30)
	},
	
	"move":function (obj,modeJson,fn,time){
		var speed={
			"veryslow":2000,
			"slow":1200,
			"normal":800,
			"fast":400,
			"veryfast":200
		};
		if(time){
			if( typeof time=="string"){
				time=speed[time];
			};
		}else{
			time=speed.normal;
		};
		var start={};
		var dis={};
		for( var key in modeJson){
			start[key]=this.getStyle(obj,key);
			dis[key]=modeJson[key]-start[key];
		};

var count=parseInt(time/30); 
		var n=0;
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			n++;
			var a=1-n/count;

for( var key2 in modeJson){
				var step_dis=start[key2]+dis[key2]*(1-a*a);  
				
				if( key2=="opacity"){
					obj.style.opacity=step_dis/100;
					obj.style.filter="alpha(opacity:"+step_dis+")";
				}else{
					obj.style[key2]=step_dis+'px';
				};
			};
			//--------------------------------------
			if(n==count){
				clearInterval(obj.timer);
				fn && fn();
			};
		},30);
	},
	//------------淡进  淡出-------------------------------------------
	 "move1" :function(obj,moveMode,end,stopTime,fn){
	 	

var start=this.getStyle(obj, moveMode);

	var dis=end-start;
	
	var count=parseInt(stopTime/30);
	var n=0;//步进

	clearInterval(obj.timer);
	
	obj.timer=setInterval(function(){
		n++;
		
		var a=1-n/count;  
		var step_dis=start+dis*(1-a*a*a);
		
		if(moveMode=='opacity'){
			obj.style.filter='alpha(opacity:'+step_dis+')';
			obj.style.opacity=step_dis/100;
		}
		else{
			obj.style[moveMode]=step_dis+'px';
		}
		
		if(n==count){
			clearInterval(obj.timer);
			fn && fn();
		};
	
	},30);
	}

}