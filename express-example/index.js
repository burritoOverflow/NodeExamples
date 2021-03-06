const express = require('express');

const server = express();
server.set('view engine', 'ejs');

// listeners are defined per url
server.get('/', (req, res) => {
  res.render('index');
});

server.get('/about', (req, res) => {
  res.render('about');
});

server.listen(8000, () => {
  console.log('Server listening on port 8000');
});
