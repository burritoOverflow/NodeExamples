const https = require('https');

// req: http.ClientRequest
const req = https.get(
  'https://www.google.com',
  (res) => {
    // res: http.IncomingMessage
    console.log(res.statusCode);
    console.log(res.headers);

    res.on('data', (data) => {
      console.log(data.toString());
    });
  }
);

req.on('error', (err) => console.error(err));

console.log(req.agent); // http.Agent
