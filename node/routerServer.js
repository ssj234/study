
//                                url.parse(string).query
//                                            |
//            url.parse(string).pathname      |
//                        |                   |
//                        |                   |
//                      ------ -------------------
// http://localhost:8888/start?foo=bar&hello=world
//                                 ---       -----
//                                  |          |
//                                  |          |
//               querystring(string)["foo"]    |
//                                             |
//                          querystring(string)["hello"]

var http = require("http");
var url = require("url");

function start(router){

  function onRequest(request,response){
       var ret = url.parse(request.url);
       var pathname=ret.pathname;
       var query=ret.query;
       console.log("Request for " + pathname + " received.");
       router(pathname);
       response.writeHead(200,{"Content-Type":"text/plain"});
       response.write('hello '+query);
       response.end();
  }

  http.createServer(onRequest).listen(8888);
}

exports.start=start;
