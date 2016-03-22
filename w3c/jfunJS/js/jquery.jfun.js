/*!
 * jQuery Shisj Plugin v1.0.0
 *
 * Copyright 2015 Shi Shengjie
 * Released under the MIT license
 */
(function ($, document, undefined) {

	var pluses = /\+/g;

	function raw(s) {
		return s;
	}

	function decoded(s) {
		return unRfc2068(decodeURIComponent(s.replace(pluses, ' ')));
	}

	function unRfc2068(value) {
		if (value.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape
			value = value.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}
		return value;
	}

	function fromJSON(value) {
		return config.json ? JSON.parse(value) : value;
	}

	var config = $.cookie = function (key, value, options) {

		// write
		if (value !== undefined) {
			options = $.extend({}, config.defaults, options);

			if (value === null) {
				options.expires = -1;
			}

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setDate(t.getDate() + days);
			}

			value = config.json ? JSON.stringify(value) : String(value);

			return (document.cookie = [
				encodeURIComponent(key), '=', config.raw ? value : encodeURIComponent(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// read
		var decode = config.raw ? raw : decoded;
		var cookies = document.cookie.split('; ');
		var result = key ? null : {};
		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = decode(parts.join('='));

			if (key && key === name) {
				result = fromJSON(cookie);
				break;
			}

			if (!key) {
				result[name] = fromJSON(cookie);
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) !== null) {
			$.cookie(key, null, options);
			return true;
		}
		return false;
	};

	if(!$.browser.msie)
	{
		$.browser.msie=/msie/.test(navigator.userAgent.toLowerCase());
	}
	//IE和Chrome设置本地变量和获取本地变量
	$.extend({
		"getLocValue":function(key)
		{
			if($.browser.msie)
			{
				return $.cookie(key);
			}else
			{
				var tmp=localStorage.getItem(key);
				if(tmp)
					return tmp;
				else
					return null;
			}
		},
		"setLocValue":function(key,value)
		{
			if($.browser.msie)
			{
				 $.cookie(key,value,{expires:7});
			}else
			{
				localStorage.setItem(key,value);
			}
		},
		//设置一个DOM 使其在父容器中居中
		"setCenter":function(selector)
		{
			$(selector).each(function(){
				var pa=$(this).parent();
				var pa_wid=pa.width();
				var pa_hei=pa.height();
				var left=(pa_wid-$(this).width())/2;
				var top=(pa_hei-$(this).height())/2;
				$(this).css("margin-left",left);
				$(this).css("margin-top",top);
			});
		},
		//动态新增本地js文件
		"getLocScript":function(src,callback,error) {
			var script=document.createElement("script");
			script.src=src;
			script.type="text/javascript";
			document.body.appendChild(script);
			if(callback){
				$(script).bind("load",function(){
					callback();
				});
			}
			if(error){
				$(script).bind("error",function(e){
					error(e);
				});
			}
		}
	});

	


})(jQuery, document);
