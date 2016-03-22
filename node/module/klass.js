var student=require("./student");
var teacher=require("./teacher");



function add (teacherName,students) {
	teacher.add(teacherName);
	students.forEach(function(item,index){
		student.add(item);
	})
}
//其他模块引用后返回的是exports对象，因此会有add方法
exports.add=add