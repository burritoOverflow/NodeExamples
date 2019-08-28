const http = require('http');

// note that the request and response arguments are streams
// req is a readable stream, res is a writable stream
const requestListener = (req, res) => {
  // display the first level of properties for the
  // request object.
  // note it's of type IncomingMessage
  console.dir(req, { depth: 0});
  console.dir(res, { depth: 0});
  res.end('Hello World');
};

const server = http.createServer();
server.on('request', requestListener);

server.listen(8000, console.log('Server listening on port 8000'));
