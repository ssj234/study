// 获取GET请求内容

// 由于GET请求直接被嵌入在路径中，URL是完整的请求路径，包括了?后面的部分，
// 因此你可以手动解析后面的内容作为GET请求的参数。
// node.js中url模块中的parse函数提供了这个功能。
// require('url').parse(req.url);

// var http = require('http');
// var url = require('url');
// var util = require('util');

// http.createServer(function(req, res){
//     res.writeHead(200, {'Content-Type': 'text/plain'});
//     res.end(util.inspect(url.parse(req.url, true)));
// }).listen(3000);

// Url {
//   protocol: null,
//   slashes: null,
//   auth: null,
//   host: null,
//   port: null,
//   hostname: null,
//   hash: null,
//   search: '?name=123',
//   query: { name: '123' },
//   pathname: '/hehe234/io',
//   path: '/hehe234/io?name=123',
//   href: '/hehe234/io?name=123' }


// 获取POST请求内容
// POST请求的内容全部的都在请求体中，
// http.ServerRequest并没有一个属性内容为请求体，原因是等待请求体传输可能是一件耗时的工作。

// 所有node.js默认是不会解析请求体的， 当你需要的时候，需要手动来做。

var http = require('http');
var querystring = require('querystring');
var util = require('util');

http.createServer(function(req, res){
    var post = '';     //定义了一个post变量，用于暂存请求体的信息

    req.on('data', function(chunk){    //通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中
        post += chunk;
    });

    req.on('end', function(){    //在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
        post = querystring.parse(post);
        res.end(util.inspect(post));
    });
}).listen(3000);


// querystring 一个和参数相关的帮助类

// querystring.stringify(obj, [sep], [eq]) 
	// 对象格式化成参数字符串 ,obj就是要格式化的对象,必选参数.
// querystring.parse(str, [sep], [eq], [options])
	// 参数字符串格式化成对象
// querystring.escape		
	// 参数编码
// querystring.unescape
	// 参数解码

