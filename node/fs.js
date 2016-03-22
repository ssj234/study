// Node.js 文件系统


// Node.js 文件系统（fs 模块）模块中的方法均有异步和同步版本，
// 例如读取文件内容的函数有异步的 fs.readFile() 和同步的 fs.readFileSync()。
// 异步的方法函数最后一个参数为回调函数，回调函数的第一个参数包含了错误信息(error)。
// 建议大家是用异步方法，比起同步，异步方法性能更高，速度更快，而且没有阻塞。


// fs.open(path, flags[, mode], callback)
// 在异步模式下打开文件的语法格式：
// path - 文件的路径。
// flags - 文件打开的行为。
//			r	以读取模式打开文件。如果文件不存在抛出异常。
//			r+	以读写模式打开文件。如果文件不存在抛出异常。
//			rs	以同步的方式读取文件。
//			rs+	以同步的方式读取和写入文件。
//			w	以写入模式打开文件，如果文件不存在则创建。
//			wx	类似 'w'，但是如果文件路径不存在，则文件写入失败。
//			w+	以读写模式打开文件，如果文件不存在则创建。
//			wx+	类似 'w+'， 但是如果文件路径不存在，则文件读写失败。
//			a	以追加模式打开文件，如果文件不存在则创建。
//			ax	类似 'a'， 但是如果文件路径不存在，则文件追加失败。
//			a+	以读取追加模式打开文件，如果文件不存在则创建。
//			ax+	类似 'a+'， 但是如果文件路径不存在，则文件读取追加失败。
// mode - 设置文件模式(权限)，文件创建默认权限为 0666(可读，可写)。
// callback - 回调函数，带有两个参数如：callback(err, fd)。

var fs=require('fs');
var util=require('util');

fs.open('input.txt','r',0666,function (err,fd) {
	err&&(console.log(err));
	console.log('log success: '+fd);
});

// 获取文件信息
// fs.stat(path, callback)
// path - 文件路径。
// callback - 回调函数，带有两个参数如：(err, stats), stats 是 fs.Stats 对象。
// stats.isFile()	如果是文件返回 true，否则返回 false。
// stats.isDirectory()	如果是目录返回 true，否则返回 false。
// stats.isBlockDevice()	如果是块设备返回 true，否则返回 false。
// stats.isCharacterDevice()	如果是字符设备返回 true，否则返回 false。
// stats.isSymbolicLink()	如果是软链接返回 true，否则返回 false。
// stats.isFIFO()	如果是FIFO，返回true，否则返回 false。FIFO是UNIX中的一种特殊类型的命令管道。
// stats.isSocket()	如果是 Socket 返回 true，否则返回 false。

fs.stat('input.txt',function(err,stats){
	err&&(console.log(err));
	console.log(stats.isFile()?"file":" not file");
});


// fs.writeFile(filename, data[, options], callback)
// 写入文件


// 读取文件
// fs.read(fd, buffer, offset, length, position, callback)


// 关闭文件
// fs.close(fd, callback)


// 截取文件
// fs.ftruncate(fd, len, callback)
// 截取len字节后的文件内容。

// 删除文件
// fs.unlink(path, callback)

// 创建目录
// fs.mkdir(path[, mode], callback)


// 读取目录
// fs.readdir(path, callback)

// 删除目录
// fs.rmdir(path, callback)


// 异步 rename
// fs.rename(oldPath, newPath, callback)

// 可以将档案的拥有者加以改变
// fs.chown(path, uid, gid, callback)


// 修改文件权限
// fs.chmod(path, mode, callback)