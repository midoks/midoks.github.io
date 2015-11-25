$(function(){

	start_img_check();
	$(document).ready(function(){
		start_img_check();
	});
	function start_img_check(){
		//var obj = $('#content img');
		var gobj = $('#content img');
		var gobj_ok = [];
		gobj.each(function(i){
			var gw = $(this).width();
			//l(gw);
			if( gw > 400 ){
				gobj_ok.push(this);
			}
		});

		img_zoom(gobj_ok);
		$(window).resize(function(){
			img_zoom(gobj_ok);
		});
		//l(document.getElementById('content').getElementsByTagName('img')[0].clientWidth);
	}

	function l(obj){console.log(obj);}
	function img_zoom(obj){
		var cw = $('#content').width();
		//l(document.body.clientWidth);
		if(obj.length > 0){
			$(obj).each(function(i){
				var ocw = $(this).width();
				//if(ocw > 400){//宽大于400px,才进行缩增功能
					if(ocw > cw){$(this).width(cw*0.9);}
					if (cw*0.8 > ocw){$(this).width(cw*0.8);}
					if(document.body.clientWidth >=1200){$(this).attr('style', '');}
				//}
			});
		}
	}
});


(function($){
	$('code').each(function(i){
		var text = $(this).html();
		$(this).html('<pre>'+text+'</pre>');
	});
}($));
