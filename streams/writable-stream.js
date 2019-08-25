// stdin echo stream

const { Writable } = require('stream');

const outStream = new Writable({
  // used to send data to resource
  write(chunk, encoding, callback) {
    // log the stream, invoke the callback
    console.log(chunk.toString());
    callback();
  }
});

process.stdin.pipe(outStream);

// note this is rather useless, and is functionally equivalent to:
// process.stdin.pipe(stdout);
