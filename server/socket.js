module.exports = io => {
  io.on('connection', socket => {
    console.log('new connection at', socket.id)
  });

  io.on('new-message', message => {
    socket.broadcast.emit('new-message', message);
  });
}