var fs=require('fs');

var data=fs.readFile('input.txt',function(err,data){
	console.log(data.toString());
	console.log('the end!');
});