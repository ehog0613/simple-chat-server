const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 8080;

app.get('/', function (req, res) {
  res.send('hello world.');
});

io.on('connection', (socket) => {
  console.log('User connected.');

  socket.on('disconnect', () => {
    console.log('User disconnected.');
    socket.emit('user disconnected', socket.userId);
  });

  socket.on('chat message', (data) => {
    console.log('data:', data);
    io.emit('chat message', data);
  });
});

http.listen(PORT, () => {
  console.log(`Socket.io server listening on port ${PORT}`);
});
