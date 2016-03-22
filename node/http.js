const http = require('http');

const hostname = '127.0.0.1';
const port = 1337;

http.createServer(function(req, res){
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n'+res.toString());
}).listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});