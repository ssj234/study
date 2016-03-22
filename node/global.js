//Node.js 中的全局对象是 global，所有全局变量（除了 global 本身以外）都是 global 对象的属性。
//global类似window，其最根本的作用是作为全局变量的宿主。



// __filename
// 表示当前正在执行的脚本的文件名。它将输出文件所在位置的绝对路径，且和命令行参数所指定的文件名不一定相同。 如果在模块中，返回的值是模块文件的路径。
console.log(__filename);
// C:\Users\shisj\Desktop\前端\node\global.js


// __dirname
// 表示当前执行脚本所在的目录。
console.log(__dirname);
// C:\Users\shisj\Desktop\前端\node


// setTimeout(cb, ms)
// 全局函数在指定的毫秒(ms)数后执行指定函数(cb)。：setTimeout() 只执行一次指定函数。
// 返回一个代表定时器的句柄值。

// clearTimeout(t)
// 全局函数用于停止一个之前通过 setTimeout() 创建的定时器。 参数 t 是通过 setTimeout() 函数创建的计算器。




// setInterval(cb, ms)
// 全局函数在指定的毫秒(ms)数后执行指定函数(cb)。

// console
// console.dir(obj[, options])用来对一个对象进行检查（inspect），并以易于阅读和打印的格式显示。
// console.time(label)	输出时间，表示计时开始。
// console.timeEnd(label)	结束时间，表示计时结束。
// console.trace(message[, ...])	当前执行的代码在堆栈中的调用路径，这个测试函数运行很有帮助，只要给想测试的函数里面加入 console.trace 就行了。
// console.assert(value[, message][, ...])

console.trace();


// process
// 用于描述当前Node.js 进程状态的对象，提供了一个与操作系统的简单接口。
// 通常在你写本地命令行程序的时候，少不了要 和它打交道。
// exit
// 		当进程准备退出时触发。
// beforeExit
// 		当 node 清空事件循环，并且没有其他安排时触发这个事件。通常来说，当没有进程安排时 node 退出，但是 'beforeExit' 的监听器可以异步调用，这样 node 就会继续执行。
// uncaughtException
// 		当一个异常冒泡回到事件循环，触发这个事件。如果给异常添加了监视器，默认的操作（打印堆栈跟踪信息并退出）就不会发生。
// Signal 事件
// 		当进程接收到信号时就触发。信号列表详见标准的 POSIX 信号名，如 SIGINT、SIGUSR1 等。


// Process 属性
// 1	stdout
// 			标准输出流。
// 2	stderr
// 			标准错误流。
// 3	stdin
// 			标准输入流。
// 4	argv
// 			argv 属性返回一个数组，由命令行执行脚本时的各个参数组成。
// 			它的第一个成员总是node，第二个成员是脚本文件名，其余成员是脚本文件的参数。
// 5	execPath
// 			返回执行当前脚本的 Node 二进制文件的绝对路径。
// 6	execArgv
// 			返回一个数组，成员是命令行下执行脚本时，在Node可执行文件与脚本文件之间的命令行参数。
// 7	env
// 			返回一个对象，成员为当前 shell 的环境变量
// 8	exitCode
// 			进程退出时的代码，如果进程优通过 process.exit() 退出，不需要指定退出码。
// 9	version
// 			Node 的版本，比如v0.10.18。
// 10	versions
// 			一个属性，包含了 node 的版本和依赖.
// 11	config
// 			一个包含用来编译当前 node 执行文件的 javascript 配置选项的对象。
// 			它与运行 ./configure 脚本生成的 "config.gypi" 文件相同。
// 12	pid
// 			当前进程的进程号。
// 13	title
// 			进程名，默认值为"node"，可以自定义该值。
// 14	arch
// 			当前 CPU 的架构：'arm'、'ia32' 或者 'x64'。
// 15	platform
// 			运行程序所在的平台系统 'darwin', 'freebsd', 'linux', 'sunos' 或 'win32'
// 16	mainModule
// 			require.main 的备选方法。不同点，如果主模块在运行时改变，require.main可能会继续返回老的模块。可以认为，这两者引用了同一个模块。
// 输出到终端
process.stdout.write("Hello World!" + "\n");

process.argv.forEach(function(val, index, array) {
   console.log(index + ': ' + val);
});

//
console.log(process.execPath)

process.abort();
