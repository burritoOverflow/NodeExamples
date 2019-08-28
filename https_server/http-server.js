const http = require('http');

const requestListener = (req, res) => {
  res.end('Hello World');
};

const server = http.createServer();
server.on('request', requestListener);

server.listen(8000, console.log('Server listening on port 8000'));
