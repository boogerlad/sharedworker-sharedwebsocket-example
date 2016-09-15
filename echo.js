var WebSocketServer = require('uws').Server
var wss = new WebSocketServer({ port: 8080 });
var connections = 0;
wss.on('connection', function connection(ws) {
	console.log(++connections);
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    ws.send(message);
  });
  ws.on('close', function(code, message){
  	console.log(--connections);
  	console.log(code);
  	console.log(message);
  });
  //ws.send('something');
});