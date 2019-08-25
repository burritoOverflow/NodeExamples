const server = require('net').createServer();

server.on('connection', socket => {
  console.log('Client connected');
  socket.write('Hello Client!');
  socket.on('data', data => {
    // note data is a buffer
    console.log('Data: ', data);
    socket.write('Data: ');
    // note the data returned to the client is a string:
    // the socket.write method assumes utf-8 encoding (default)
    socket.write(data);
  });
  // we can also explicitly set the encoding
  socket.setEncoding('utf8');
  socket.on('end', () => {
    console.log('Client has ended the connection');
  })
});

server.listen(8000, () => {console.log('Server bound to port 8000.')});
