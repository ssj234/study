//JavaScript 语言自身只有字符串数据类型，没有二进制数据类型
//但在处理像TCP流或文件流时，必须使用到二进制数据。因此在 Node.js中，定义了一个 Buffer 类，该类用来创建一个专门存放二进制数据的缓存区。
//Buffer 类是随 Node 内核一起发布的核心库
//Buffer 库为 Node.js 带来了一种存储原始数据的方法，可以让 Node.js 处理二进制数据，每当需要在 Node.js 中处理I/O操作中移动的数据时，就有可能使用 Buffer 库。
//一个 Buffer 类似于一个整数数组，但它对应于 V8 堆内存之外的一块原始内存。
var nextLine=function (arg) {
	arg=arg||"";
	console.log('----------');
}
//1.创建长度为 10 字节的 Buffer 实例
var buf1 = new Buffer(10);

//2.通过给定的数组创建 Buffer 实例：
var buf2 = new Buffer([0x5,0x3,0xf,0x2]);

//3.通过一个字符串来创建 Buffer 实例：
var buf3 = new Buffer("史圣杰", "utf-8");


//-1 写入缓冲区 buf.write(string[, offset[, length]][, encoding])
//string - 写入缓冲区的字符串。
//offset - 缓冲区开始写入的索引值，默认为 0 。
//length - 写入的字节数，默认为 buffer.length
//encoding - 使用的编码。默认为 'utf8' 。
//返回实际写   入的大小。
var size=buf1.write('hello this is a buffer test!',0,5,'utf-8');
console.log('write size:'+size);
nextLine();

//-2 从缓冲区读取数据 buf.toString([encoding[, start[, end]]])
//encoding - 使用的编码。默认为 'utf8' 。
//start - 指定开始读取的索引位置，默认为 0。
//end - 结束位置，默认为缓冲区的末尾。
var rs=buf3.toString('utf-8');
console.log('read buffer:'+rs);
nextLine();


//-3 将 Buffer 转换为 JSON 对象
//buf.toJSON() 结果为{type:'buffer',data:[n1,n2,...]}
var json_buf = new Buffer('{name:1}');
var json = json_buf.toJSON(json_buf);
console.log(json);
nextLine();

//-4 缓冲区合并
//Buffer.concat(list[, totalLength])
//list - 用于合并的 Buffer 对象数组列表。
//totalLength - 指定合并后Buffer对象的总长度。
//返回一个多个成员合并的新 Buffer 对象。

var buffer1 = new Buffer('菜鸟教程 ');
var buffer2 = new Buffer('www.runoob.com');
var buffer3 = Buffer.concat([buffer1,buffer2]);
console.log("buffer3 内容: " + buffer3.toString());
nextLine();


//-5 缓冲区比较
//buf.compare(otherBuffer);
//otherBuffer - 与 buf 对象比较的另外一个 Buffer 对象。
//返回一个数字，表示 buf 在 otherBuffer 之前，之后或相同。

var cmpbuffer1 = new Buffer('ABC');
var cmpbuffer2 = new Buffer('ABCD');
var result = cmpbuffer1.compare(cmpbuffer2);

if(result < 0) {
   console.log(cmpbuffer1 + " 在 " + cmpbuffer2 + "之前");
}else if(result == 0){
   console.log(cmpbuffer1 + " 与 " + cmpbuffer2 + "相同");
}else {
   console.log(cmpbuffer1 + " 在 " + cmpbuffer2 + "之后");
}
nextLine();


//-6 拷贝缓冲区
//buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])
//targetBuffer - 要拷贝的 Buffer 对象。
//targetStart - 数字, 可选, 默认: 0
//sourceStart - 数字, 可选, 默认: 0
//sourceEnd - 数字, 可选, 默认: buffer.length
var copybuf1 = new Buffer('ABC');
// 拷贝一个缓冲区
var copybuf2 = new Buffer(3);
copybuf1.copy(copybuf2);// copy copybuf1 to copybuf2
console.log("buffer2 content: " + copybuf2.toString());
nextLine();

//-7 缓冲区裁剪
//buf.slice([start[, end]])
//start - 数字, 可选, 默认: 0
//end - 数字, 可选, 默认: buffer.length
//返回一个新的缓冲区，它和旧缓冲区指向同一块内存，但是从索引 start 到 end 的位置剪切。
var cutbuf1 = new Buffer('runoob');
// 剪切缓冲区
var cutbuf2 = cutbuf1.slice(0,2);
console.log("cutbuf2 content: " + cutbuf2.toString());
nextLine();

//-8 缓冲区长度
//buf.length;
console.log("cutbuf2 content: " + cutbuf2.length);
nextLine();




