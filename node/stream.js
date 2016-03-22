//-9 Stream(流)
//Stream 是一个抽象接口，Node 中有很多对象实现了这个接口。
//例如，对http 服务器发起请求的request 对象就是一个 Stream，还有stdout（标准输出）。
// Node.js，Stream 有四种流类型：
// 		Readable - 可读操作。
// 		Writable - 可写操作。
// 		Duplex - 可读可写操作.
// 		Transform - 操作被写入数据，然后读出结果。
//所有的 Stream 对象都是 EventEmitter 的实例。常用的事件有：
// 		data - 当有数据可读时触发。
// 		end - 没有更多的数据可读时触发。
// 		error - 在接收和写入过程中发生错误时触发。
// 		finish - 所有数据已被写入到底层系统时触发

var fs = require("fs");


//创建流，从流中读取数据
var readStream=fs.createReadStream('input.txt');
readStream.setEncoding('utf8');

var data="";
readStream.on("data",function(seg){
	data+=seg;
	console.log('[seg]:\r\n'+seg);
});

readStream.on("end",function(){
	console.log('[data]:\r\n'+data);
});
console.log('The end!');


//写入流
var writeStream=fs.createWriteStream('out.txt');
//写入utf8数据
writeStream.write('Heheda!','utf8');
// 标记文件末尾
writeStream.end();


writeStream.on("finish",function(){
	console.log('write over!');
});

writeStream.on('error',function(e){
	console.log(e.stack);
})


//管道流
//管道提供了一个输出流到输入流的机制。通常我们用于从一个流中获取数据并将数据传递到另外一个流中。
//创建管道
var rs=fs.createReadStream('pipe.in');
var ws=fs.createWriteStream('pipe.out');

rs.pipe(ws);
console.log('pipe end!');

rs.on("error",function(error){
	console.log(error.stack);
});


//链式流
// 链式是通过连接输出流到另外一个流并创建多个对个流操作链的机制。链式流一般用于管道操作
var zlib = require('zlib');
fs.createReadStream('input.txt')
	.pipe(zlib.createGzip())
	.pipe(fs.createWriteStream('input.txt.gz'));
console.log("文件压缩完成。");









