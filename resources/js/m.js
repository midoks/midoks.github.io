

//start parser
$(function(){

var defaults = {
	  html:         false,        // Enable HTML tags in source
	  xhtmlOut:     false,        // Use '/' to close single tags (<br />)
	  breaks:       false,        // Convert '\n' in paragraphs into <br>
	  langPrefix:   'language-',  // CSS language prefix for fenced blocks
	  linkify:      true,         // autoconvert URL-like texts to links
	  linkTarget:   '',           // set target to open link in
	  typographer:  true,         // Enable smartypants and other sweet transforms

	  // options below are for demo only
	  _highlight: true,
	  _strict: false,
	  _view: 'html'               // html / src / debug
};

defaults.highlight = function (str, lang) {
		if (!defaults._highlight || !window.hljs) { return ''; }

		var hljs = window.hljs;
		if (lang && hljs.getLanguage(lang)) {
		  try {
		    return hljs.highlight(lang, str).value;
		  } catch (__) {}
		}

		try {
		  return hljs.highlightAuto(str).value;
		} catch (__) {}

		return '';
};

//var markdownParser = new window.Remarkable('commonmark');
var markdownParser = new window.Remarkable('full', defaults);

// Beautify output of parser for html content
markdownParser.renderer.rules.table_open = function () {
  return '<table class="table table-striped">\n';
};

//
// Inject line numbers for sync scroll. Notes:
//
// - We track only headings and paragraphs on first level. That's enougth.
// - Footnotes content causes jumps. Level limit filter it automatically.
//

markdownParser.renderer.rules.paragraph_open = function (tokens, idx) {
  var line;
  if (tokens[idx].lines && tokens[idx].level === 0) {
    line = tokens[idx].lines[0];
    return '<p class="line" data-line="' + line + '">';
  }
  return '<p>';
};

markdownParser.renderer.rules.heading_open = function (tokens, idx) {
  var line;
  if (tokens[idx].lines && tokens[idx].level === 0) {
    line = tokens[idx].lines[0];
    return '<h' + tokens[idx].hLevel + ' class="line" data-line="' + line + '">';
  }
  return '<h' + tokens[idx].hLevel + '>';
};

// This values are default
var md = new Remarkable({
  html:         false,        // Enable html tags in source
  xhtmlOut:     true,        // Use '/' to close single tags (<br />)
  breaks:       true,        // Convert '\n' in paragraphs into <br>
  langPrefix:   'language-',  // CSS language prefix for fenced blocks
  linkify:      true,        // Autoconvert url-like texts to links
  typographer:  true,        // Enable smartypants and other sweet transforms

  // Highlighter function. Should return escaped html,
  // or '' if input not changed
  highlight: function (/*str, , lang*/) { return ''; }
});
//
// console.log(md.render('# Remarkable rulezz!'));



var content = $("#content").html();
console.log(content);
var v = markdownParser.render(content);
//$("#content").html(v);
console.log(v);

// $(content).each(function(i){
//
// console.log(this);
//
// 	var o = $(this).html();
// 	// if (o != ""){
// 		 var v = markdownParser.render(o);
// 		 console.log(v);
//
// 		 $(this).html(v);
// 	// }
// });

}($));
//end parser

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


// (function($){
// 	$('code').each(function(i){
// 		var text = $(this).html();
// 		$(this).html('<pre>'+text+'</pre>');
// 	});
// }($));
