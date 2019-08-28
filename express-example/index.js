const express = require('express');

const server = express();

// listeners are defined per url
server.get('/', (req, res) => {
  // .end is invoked automatically
  res.send('Hello from Express');
});

server.get('/about', (req, res) => {
  res.send('Hello from About');
});

server.listen(8000, () => {
  console.log('Server listening on port 8000');
});
