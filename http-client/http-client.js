// example of using http request to request google's homepage

const http = require('http');

// note this is an event emitter
const req = http.request(
  { hostname: 'www.google.com' },
  (res) => {
    console.log(res.statusCode);
    console.log(res.headers);

    // emits a data event
    res.on('data', (data) => {
      data.toString();
    });
  }
);

req.on('error', (err) => console.error(err));

// note request object is a writable stream
req.end();
