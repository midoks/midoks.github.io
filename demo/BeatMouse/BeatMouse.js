/* author:midoks */

//建立模型 | 并初始化默认值
var Mouse = function(type){
	this.mouse = null;
	this.num = -1;
	//显示时间的ID
	this.showTimeId = 'time';
	//地鼠道具速度
	this.DiShuRemainTime = 10;
	//地鼠道具出现的间隔
	this.DiShuSeg = 30;
	//素材
	this.mousetype = {
		"good": "image/good.gif",
		"bad": "image/bad.gif",
		"goodkill":"image/goodkill.gif",
		"badkill":"image/badkill.gif"
	};
}


Mouse.prototype = {
	
	$ : function (id){
		return document.getElementById(id);
	},

	//解决道具在运行中,出现重复
	isLive:false,
	
	/* 初始化地鼠模型样式 | 布置场景 */
	init : function(){
		var mouse = document.createElement("div");
		mouse.style.cssText = 'width:75px;height:100px;'+
			 //'background:url('+this.mousetype[type]+');'+
			 'left:0;top:21px;position:relative;margin:auto;cursor:pointer;';
		//console.log(mouse);
		//top:21 --- -40px
		return mouse;
	},

	initCj: function (){
		//布置场景
		var cj = this.$('ditu').getElementsByTagName('li');
		var len = cj.length;
		for(var i in cj){
			if(i<=(len-1)){
				var mouse  = this.init('good');
				cj[i].appendChild(mouse);
			}
		}
	},
	
	/* 开始倒计时 */
	getTime: function(){
		var time = parseInt(this.$(this.showTimeId).innerText);
		//this.timeRun = time;
		//console.log(time);
		return time;
	},
	setTime : function(v){
		this.$(this.showTimeId).innerText = v; 
	},

	getScore:function(){
		var s = parseInt(this.$('score').innerText);
		return s;
	},
	setScore:function(v){
		this.$('score').innerText = parseInt(v); 
	},

	/* 动画操作 */
	animation : function(t, bgImg, bgOnclickImg, type){
		var timerseg = this.DiShuRemainTime;
		var timer,_this = this;
		//top
		var tp = parseInt(t.style.top);
		t.style.backgroundImage = "url("+bgImg+")";
		//点击事件变成的图片
		t.onclick = function(){
			this.style.backgroundImage = "url("+bgOnclickImg+")";
			if(type=='good'){
				_this.setScore(_this.getScore()+100);
			}else{
				_this.setScore(_this.getScore()-100);
			}
		}
		//console.log(tp);
		var show  = function(tp){
			//console.log(tp);
			//console.log(timerseg);
			t.style.top = tp + "px";
			//console.log(t.style.top);
			_this.isLive = true;
			if(tp>=-40){
				setTimeout(function(){show(tp-1)}, timerseg);
			}else{
				setTimeout(function(){hide(-40)}, timerseg);
			}
		}

		var hide = function(tp){
			//console.log(tp);
			t.style.top = tp + "px";	
			if(tp <= 22){
				_this.isLive = true;
				setTimeout(function(){hide(tp+1)}, timerseg);
			}else{
				_this.isLive = false;
				//console.log("end");return;
			}
			//console.log(_this.isLive);
		}
		show(tp);
		console.log(this.isLive);
		
	},

	/*startRun : function(callback , obj){
		var _this = this;
		if(typeof callback == 'function'){
			var timer;
			function xunhuan(){
				var timer = setInterval(function(){
				var time = _this.getTime();
				if(time <= 0){
					clearInterval(timer);
				}else{
					callback();
					_this.setTime(time-1);
					//console.log("run");
				}	
				}, 1000);
			}
			xunhuan();
		}	   
	},*/


	/* 游戏开始 */
	start : function(){
		var randNum = parseInt(Math.random()*9, 10);
		var ds = $('ditu').getElementsByTagName('li');
		var an = ds[randNum].getElementsByTagName('div')[0];
		
		if(!this.isLive){
			if(parseInt(Math.random()*2)){
				this.animation(an, this.mousetype["good"], this.mousetype["goodkill"], "good");
			}else{
				this.animation(an, this.mousetype["bad"], this.mousetype["badkill"], "bad");
			}
		}
		/*if(parseInt(Math.random()*2)){
			this.animation(an, this.mousetype["good"], this.mousetype["goodkill"], "good");
		}else{
			this.animation(an, this.mousetype["bad"], this.mousetype["badkill"], "bad");
		}*/
	},
};


var G = {
	

	time: 61,

	initMouse:false,

	startGame:false,

	lis:null,

	getTime: function(){
		var time = document.getElementById('time').innerText;
		//this.timeRun = time;
		//console.log(time);
		return time;
	},
	setTime : function(v){
		document.getElementById('time').innerText = v;
	},
	setScore: function(v){
		document.getElementById('score').innerText = v;
	},
	init: function(){
		  this.lis = docment.getElementById('ditu').getElementByTagName('li');
		  _list = this;
	},
	
	//startObj:null,
	start:function(){

		/*if(this.startGame){
			alert('结束后才可以重新开始');return;
		}*/

		//初始化
		//if(!this.startObj)
		var startObj = new Mouse();



		if(!this.initMouse){
			startObj.initCj();
			this.initMouse = true;
			this.startGame = true;
		}
		if(this.getTime() <= 0) return;
		var _this = this;
		startObj.start();
		setTimeout(function(){_this.start();}, 50);
	},

	startTime:function(){
		//this.time -=1;
		//初始化倒计时
		if(this.time <= 0) return;
		this.time -=1;
		var _this = this;
		//this.time = this.time-1;
		this.setTime(this.time);
		//console.log(this.time);
		if(this.time > 0){
			setTimeout(function(){_this.startTime()},1000);
		}		
	},

	restart:function(){
		this.time = 61;
		this.setTime(60);
		this.setScore(0);
	},

	stop:function(){
		this.time = 0;
		this.setTime(0);
	}
};


//window['Mouse'] = new Mouse();
/* id选择 */
function $(id){
	return document.getElementById(id);
}

//页面加载完后执行
window.onload = function(){
	var t = true;
	//点击开始
	$('start').onclick = function(){
		console.log(t);
		if(t){
			G.start();
			G.startTime();
			t = false;
		}
	};

	//重新开始
	$('restart').onclick = function(){	
		G.restart();
		//t = true;
	
	};
	//停止
	$('stop').onclick = function(){
		G.stop();
	};
}

