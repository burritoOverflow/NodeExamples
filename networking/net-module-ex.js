const server = require('net').createServer();

// for each individual connection
let counter = 0;
let sockets = {};

server.on('connection', socket => {
  socket.id = counter++;
  // associate a socket with its assigned id number in the object
  sockets[socket.id] = socket;
  console.log(`Client ${socket.id} connected`);
  socket.write('Hello Client!\n');
  socket.write(`Your id is: ${socket.id}\n`);

  socket.on('data', data => {
    // now data is broadcasted to each client
    Object.entries(sockets).forEach(([key, clientSocket]) => {
      // note data is a buffer
      // also note the identifier of the socket writing the data is displayed
      clientSocket.write(`${socket.id}: `);
      // note the data returned to the client is a string:
      // the socket.write method assumes utf-8 encoding (default)
      clientSocket.write(data);
    });
  });

  // we can also explicitly set the encoding
  socket.setEncoding('utf8');
  socket.on('end', () => {
    // when a client leaves, delete the corresponding socket from the
    // socket object. If the socket remains, it will crash when sending to
    // a socket that no longer exists  
    delete sockets[socket.id];
    console.log('Client has ended the connection');
  })
});

server.listen(8000, () => {console.log('Server bound to port 8000.')});
