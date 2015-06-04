var express = require('express');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('build'));

var state = [];

io.on('connection', function (socket) {
  
  var color = "#"+((1<<24)*Math.random()|0).toString(16);

  io.sockets.emit('init', { color: color, state: state });
  
  socket.on('addPath', function (path) {
    var path = {color:color, from: path.from, to: path.to};
    state.push(path);
    io.sockets.emit('addPath', path);
  });
  

});


server.listen(8080);
