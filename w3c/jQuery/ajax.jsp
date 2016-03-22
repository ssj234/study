<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>JQM AJAX TEST</title>
<link href="../global/css/common.css" rel="stylesheet"/>
<style>
</style>
</head>
<body>
<div class="block">
	<div class="head"><b>1.load()</b></div>
	<ul>
		<li>load()方法是jQuery中最简单和常用的方法，用于载入远程HTML</li>
		<li>load(url,[,data][,callback]);data可选 发送至服务器的key/value，callback可选 回调方法</li>
		<li>url: load.html;如果只想加载某个dom 可以"load.html span"</li>
		<li>data: 若无data采用get 否则采用post</li>
		<li>callback: 无论是否成功，只有请求完成即被触发，如load22.html 虽然找不到 但也触发callback</li>
		<li><pre>
			$("#loadRS").load("load.html span",function(data){
				alert("load ok");
			});</pre></li>
	</ul>
	<div class="example">
		<input type="button" id="load" name="load" value="load"/>
		<div id="loadRS" class="result">
		</div>
	</div>
</div>
<div class="block">
	<div class="head"><b>2.get()</b></div>
	<ul>
		<li>$.get()方法使用GET方式进行异步请求</li>
		<li>get(url,[,data][,callback][,type]);data可选 发送至服务器的key/value，callback可选 只有在成功(success)时触发，type服务器返回的格式</li>
		<li>url: load.html;如果只想加载某个dom 可以"load.html span"</li>
		<li>data: 若无data采用get 否则采用post</li>
		<li>callback: 数据成功返回(success)时触发callback，有两个参数：data 返回的内容(xml/json/html...),textStatus(success/error/notmodified/timeout)</li>
		<li><pre>
			$.get("ajax_get_json.jsp",{"name":"shisj","age":"28"},
					function(data){
					$("#getRS").html("name: "+data.name+" age: "+data.age);
				},"json");
			</pre></li>
	</ul>
	<div class="example">
		<input type="button" id="get" name="get" value="get"/>
		<div id="getRS" class="result">
		</div>
	</div>
</div>
<div class="block">
	<div class="head"><b>3.post()</b></div>
	<ul>
		<li>$.post()()方法使用POST方式进行异步请求</li>
		<li>与get的区别:<br/>1.get方式的参数再URL中传递，大小有限制2KB；post使用HTTP请求的实体内容发送<br/>
					    2.get方式数据会被缓存，在history中查看，安全问题<br/></li>
		<li>post(url,[,data][,callback][,type]);data可选 发送至服务器的key/value，callback可选 只有在成功(success)时触发，type服务器返回的格式</li>
		<li><pre>
			$.post("ajax_get_json.jsp",{"name":"shisj","age":"28"},
					function(data){
					$("#postRS").html("name: "+data.name+" age: "+data.age);
				},"json");
			</pre></li>
	</ul>
	<div class="example">
		<input type="button" id="post" name="post" value="post"/>
		<div id="postRS" class="result">
		</div>
	</div>
</div>
<div class="block">
	<div class="head"><b>4.getScript()/getJSON()</b></div>
	<ul>
		<li>$.getScript()()方法可以动态创建&lt;script&gt;标签</li>
		<li>原始方法可使用:<br/>
		1.$(document.createElement("script")).attr("src","test.js").appendTo("head");<br/>
		2.$("&lt;script&gt; type='text/script' src='test.js' /&gt;").appendTo("head");</li>
		<li>getScript(url,[,callback]);callback可选 加载结束后调用</li>
		<li>getJSON用于加载JSON文件，与getScript的使用方法相同，回调函数变量data为json数据</li>
		<li>getJSON(url,[,callback]);callback可选 加载结束后调用</li>
		<li>IE8及某些浏览器内置JSON处理功能，其他可使用JSON库可以对&lt;对象-字符串&gt;进行转换：JSON.stringify(obj)返回一个字符串，JSON.parse(str)返回一个对象</li>
		<li><pre>
			$.getScript("test.js",function(){
					$("#getScriptRS").html("name: "+test.name+" age: "+test.age);
				});
			</pre></li>
	</ul><div class="example">
	<input type="button" id="getScript" name="getScript" value="getScript"/>
	<input type="button" id="getJSON" name="getJSON" value="getJSON"/>
	<div id="getScriptRS" class="result">
	</div></div>
</div>
<div class="block">
	<div class="head"><b>5.ajax()</b></div>
	<ul>
		<li>$.ajax()方法是jQuery最底层的Ajax实现</li>
		<li>$.ajax(options)该方法只有1个参数<br/>
			<table>
				<tr>
					<th>参数名称</th>
					<th>类型</th>
					<th>说明</th>
				</tr>
				<tr>
					<td>url</td>
					<td>String</td>
					<td>发送请求的地址(默认为当前页地址)</td>
				</tr>
				<tr>
					<td>type</td>
					<td>String</td>
					<td>请求方式(POST/GET) 默认为GET</td>
				</tr>
				<tr>
					<td>timeout</td>
					<td>Number</td>
					<td>设置请求超时时间(毫秒)。此设置会覆盖$.ajaxSetup()方法的全局设置</td>
				</tr>
				<tr>
					<td>data</td>
					<td>Object/String</td>
					<td>发送到服务器的数据，如果已经不是字符串，将自动转换为字符串格式</td>
				</tr>
				<tr>
					<td>dataType</td>
					<td>String</td>
					<td>预期服务器返回的数据类型，xml/html/script/json/jsonp/text</td>
				</tr>
				<tr>
					<td>beforeSend</td>
					<td>Function</td>
					<td>发送请求前可以修改XMLHttpRequest对象的函数，如添加自定义HTTP头、若返回false可取消ajax</td>
				</tr>
				<tr>
					<td>complete</td>
					<td>Function</td>
					<td>请求完成后调用的回调函数(请求成功或失败时均可调用) 两个参数:XMLHttpRequest,textStatus</td>
				</tr>
				<tr>
					<td>success</td>
					<td>Function</td>
					<td>请求成功后调用的回调函数，两个参数:data服务器返回的数据 textStatus描述状态的字符串</td>
				</tr>
				<tr>
					<td>error</td>
					<td>Function</td>
					<td>请求失败时调用的函数，三个参数：XMLHttpRequest textStatus errorThrown</td>
				</tr>
				<tr>
					<td>global</td>
					<td>Boolean</td>
					<td>默认为true，表示是否触发全局ajax事件，设置为false将不会触发全局ajax事件</td>
				</tr>
				<tr>
					<td>async</td>
					<td>Boolean</td>
					<td>默认为true，表示异步</td>
				</tr>
			</table>
		</li>
		<li><pre>
				$("#ajax").click(function(){
					$.ajax({
						"url":"ajax_get_json.jsp",
						"global":true,
						"data":{"name":"shisj","age":"28"},
						"dataType":"json",
						"complete":function(){},
						"error":function(){},
						"success":function(data){
							$("#ajaxRS").html("name: "+data.name+" age: "+data.age);
						},
						"beforeSend":function(){}				
			});
		});
			</pre></li>
	</ul><div class="example">
	<input type="button" id="ajax" name="ajax" value="ajax"/>
	<div id="ajaxRS" class="result">
	</div></div>
</div>

<div class="block">
	<div class="head"><b>6.ajax全局事件</b></div>
	<ul>
		<li><i>jQuery1.8之后 ajax全局事件只能绑定到document上</i></li>
		<li>ajaxSetup(options) 设置全局的ajax参数</li>
		<li>ajaxComplete(callback) 请求完成时执行的函数</li>
		<li>ajaxError(callback) 请求发送错误时执行的函数</li>
		<li>ajaxSend(callback) 请求发送前时执行的函数</li>
		<li>ajaxSuccess(callback) 请求成功时执行的函数</li>
	</ul><div class="example">
	<input type="button" id="global" name="global" value="global"/>点击后注册全局事件，点击上面的ajax可以看到效果
	<div id="globalRS" class="result">
	</div></div>
</div>
<div class="block">
	<div class="head"><b>7.其他</b></div>
	<ul>
		<li><i>jStore库提供了一个抽象层，是跨浏览器的客户端存储成为可能</i></li>
		<li><i>Pure模板引擎将数据结构中的数据与具有相同类的HTML元素关联</i></li>
		<li><i>Ajaxqueue插件用于实现排队行为</i></li>
		<li><i>jquery.history.js插件用于实现历史记录功能</i></li>
	</ul>
</div>
<div id="loading">
</div>

<script language="javascript" src="js/jquery.js"></script>
<script>

	$(document).ready(function(){
		//1.load
		$("#load").click(function(){
			$("#loadRS").load("load.html span",function(data){
				alert("load ok");
			});
		});
		//2.get
		$("#get").click(function(){
			$.get("ajax_get_json.jsp",{"name":"shisj","age":"28"},
					function(data){
					$("#getRS").html("name: "+data.name+" age: "+data.age);
				},"json");
		});
		//3.post
		$("#post").click(function(){
			$.post("ajax_get_json.jsp",{"name":"shisj","age":"28"},
					function(data){
					$("#postRS").html("name: "+data.name+" age: "+data.age);
				},"json");
		});
		//4 getScript
		$("#getScript").click(function(){
			$.getScript("js/test.js",function(){
				$("#getScriptRS").html("name: "+test.name+" age: "+test.age);
			});
			
		});
		$("#getJSON").click(function(){
			$.getJSON("js/test.json",function(data){
				$("#getScriptRS").html("name: "+data.name+" age: "+data.age);
			});
		});

		//5 ajax
		$("#ajax").click(function(){
			$.ajax({
				"url":"ajax_get_json.jsp",
				"data":{"name":"shisj","age":"28"},
				"dataType":"json",
				"complete":function(){},
				"error":function(){},
				"success":function(data){
					$("#ajaxRS").html("name: "+data.name+" age: "+data.age);
				},
				"beforeSend":function(){}				
			});
		});
		//6 global
		$("#global").click(function(){
			$.ajaxSetup({"global":true,"cache":false});
			$(document).ajaxComplete(function(){
				$("#loading").html($("#loading").html()+"  ajax调用完成");
				setTimeout(function(){
					$("#loading").html("");
						},500);
			}).ajaxError(function(){
				$("#loading").html($("#loading").html()+"  ajax调用时发送错误");
			}).ajaxSend(function(){
				$("#loading").html($("#loading").html()+"  ajax正在发送");
			}).ajaxSuccess(function(){
				$("#loading").html($("#loading").html()+"  ajax调用成功");
			}).ajaxStart(function(){
				$("#loading").fadeIn();
				$("#loading").html($("#loading").html()+"  ajax开始");
			});
			$("#globalRS").html("设置成功，点击上面的ajax可以看到效果");
		});
		
	});
</script>
</body>
</html>