//模块是Node.js 应用程序的基本组成部分，文件和模块是一一对应的。
//换言之，一个 Node.js 文件就是一个模块，这个文件可能是JavaScript 代码、JSON 或者编译过的C/C++ 扩展。


//引入了当前目录下的klass.js文件
var klass=require('./klass')
//调用
klass.add('yangfan',['baifumei','gaofushuai'])


//Node.js 提供了exports 和 require 两个对象
//其中 exports 是模块公开的接口，require 用于从外部获取一个模块的接口，即所获取模块的 exports 对象。

//服务端的模块放在哪里
//var http = require("http");
//Node.js中自带了一个叫做"http"的模块，我们在我们的代码中请求它并把返回值赋给一个本地变量。
//这把我们的本地变量变成了一个拥有所有 http 模块所提供的公共方法的对象。

// http、fs、path等，原生模块。
// ./mod或../mod，相对路径的文件模块。
// /pathtomodule/mod，绝对路径的文件模块。
// mod，非原生模块的文件模块。