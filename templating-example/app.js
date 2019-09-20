const ejs = require('ejs');
const fs = require('fs');
const http = require('http');

const filename = './templates/people.ejs';

const people = [
  { name: 'Fred', age: 124 },
  { name: 'Bert', age: 54},
  { name: 'Patricia', age: 90}
];

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    fs.readFile(filename, (err, data) => {
      const template = data.toString();
      // context is the data passed to the
      // template.
      const context = { people: people };
      const cache = process.env.NODE_ENV === 'production';
      const output = ejs.render(
        template,
        { people, cache, filename }
      );
      res.setHeader('Content-Type', 'text/html');
      res.end(output);
    });
  } else {
    // we'll only serve on the root route.
    res.statusCode = 404;
    res.end('Nothing here.');
  }
});

server.listen(8080);
