

//events 模块只提供了一个对象:EventEmitter 类
//EventEmitter 的核心就是事件触发与事件监听器功能的封装。
//可以通过require("events");来访问该模块
var events=require('events');
//创建 eventEmitter 对象
var eventEmitter=new events.EventEmitter();

//回调函数
var connectHandler = function connected() {
	console.log('connected ok!');
	console.log('-------------');

	eventEmitter.emit('data_received',1,'2',false,['a','b']);
}
//需要放在前面，该事件在添加新监听器时被触发
eventEmitter.on("newListener",function(){
	console.log('add listener');
})
//从指定监听器数组中删除一个监听器，此操作将会改变处于被删监听器之后的那些监听器的索引。


eventEmitter.on('connection', connectHandler);

//EventEmitter 的每个事件由一个事件名和若干个参数组成，
//事件名是一个字符串，通常表达一定的语义。
//对于每个事件，EventEmitter 支持 若干个事件监听器。
eventEmitter.on('data_received', function(a,b,c,d){
   console.log('[REV-1]数据接收成功:');
   console.log(a+' '+b+' '+c+' '+d.join(','));
});

eventEmitter.on('data_received', function(a,b,c,d){
   console.log('[REV-2]数据接收成功:');
   console.log(a+' '+b+' '+c+' '+d.join(','));
});


setTimeout(function(){
	eventEmitter.emit('connection');
	eventEmitter.removeListener('connection',connectHandler);
	console.log('connection listener count after remove:'+eventEmitter.listenerCount('connection'));
},2000);

console.log('the end!!');
console.log('connection listener count:'+eventEmitter.listenerCount('connection'));


//EventEmitter 定义了一个特殊的事件 error，它包含了错误的语义，
//当 error 被触发时，EventEmitter 规定如果没有响 应的监听器，
//Node.js 会把它当作异常，退出程序并输出错误信息。
eventEmitter.emit('error');

//大多数时候我们不会直接使用 EventEmitter，
//而是在对象中继承它。包括 fs、net、 http 在内的，只要是支持事件响应的核心模块都是 EventEmitter 的子类。

//addListener(event, listener)
//on(event, listener)
//once(event, listener)
//removeListener(event, listener)
//removeAllListeners([event])
//setMaxListeners(n)
//listeners(event)	返回指定事件的监听器数组。
//emit(event, [arg1], [arg2], [...])	按参数的顺序执行每个监听器，如果事件有注册监听返回 true，否则返回 false

