// util 是一个Node.js 核心模块，提供常用函数的集合，用于弥补核心JavaScript 的功能 过于精简的不足。

// util.inherits(constructor, superConstructor)是一个实现对象间原型继承 的函数。

var util=require('util');

function Base(name) {
	this.name='base';
	this.say=function(){
		console.log("this is "+name);
	}
}

Base.prototype.see= function(you) {
	console.log(this.name+' see: '+you);
};

var base=new Base("shisj");
base.say();
base.see('tom');

function Sub(){
	this.name = 'sub'; 
}

util.inherits(Sub, Base);

var sub=new Sub('Yangfendd');
// sub.say();//Sub 仅仅继承了Base 在原型中定义的函数，而构造函数内部创造的 base 属 性和 say 函数都没有被 Sub 继承。
sub.see('jerry');


// util.inspect
// util.inspect 并不会简单地直接把对象转换为字符串，即使该对 象定义了toString 方法也不会调用。
// util.inspect(object,[showHidden],[depth],[colors])是一个将任意对象转换 为字符串的方法，通常用于调试和错误输出。
// showHidden 是一个可选参数，如果值为 true，将会输出更多隐藏信息。
// depth 表示最大递归的层数，如果对象很复杂，你可以指定层数以控制输出信息的多 少。如果不指定depth，默认会递归2层，指定为 null 表示将不限递归层数完整遍历对象。
// colors如果color 值为 true，输出格式将会以ANSI 颜色编码，通常用于在终端显示更漂亮 的效果。
console.log('[uninspect]'+base);
console.log('[inspect]  '+util.inspect(base,false,2,true));


// util.isArray(object)
// 如果给定的参数 "object" 是一个数组返回true，否则返回false。

console.log('[1,2,3,4] '+(util.isArray([1,2,3,4])?"is array!":"not array!"));


// util.isRegExp(object)
// 如果给定的参数 "object" 是一个正则表达式返回true，否则返回false。
console.log('[1,2,3,4] '+(util.isRegExp([1,2,3,4])?"is RegExp!":"not RegExp!"));
console.log('name '+(util.isRegExp(/name/)?"is RegExp!":"not RegExp!"));


// util.isDate(object)
// 如果给定的参数 "object" 是一个日期返回true，否则返回false。
var date=new Date();
console.log(date+(util.isDate(date)?" is date object":"not date object"));


// util.isError(object)
// util.isError(new Error())	true
