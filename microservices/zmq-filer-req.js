'use strict'

const zmq = require('zeromq');
const filename = process.argv[2];

// create request endpoint
const requester = zmq.socket('req');

// handle replies from responder
requester.on('message', data => {
    const response = JSON.parse(data);
    console.log(`Received response:`, response)
});

requester.connect('tcp://localhost:60401');

console.log(`Sending request for ${filename}`);
requester.send(JSON.stringify({ path: filename }));
