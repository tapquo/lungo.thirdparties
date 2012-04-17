var http = require('http');

var server = http.createServer(function(req, res){
	res.end();
});

var io = require('socket.io').listen(server);

io.sockets.on("connection", function(socket){
	socket.on("question", function(data){
		socket.emit("answer", data);
	});
});

server.listen(3000);
