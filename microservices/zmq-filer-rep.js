/* 
creates a zmq REP socket and uses it to respond to incoming requests
responder (this program) waits for a request and serves the content
requested. See page 62.
*/

'use strict'

const fs = require('fs');
const zmq = require('zeromq');

// Socket to reply to client requests
const responder = zmq.socket('rep');

// handle incoming requests
responder.on('message', data => {
    // parse the incoming message.
    const request = JSON.parse(data);
    console.log(`Received request to get: ${request.path}`);

    // read the file, reply with file's contents.
    fs.readFile(request.path, (err, content) => {
        console.log('Sending response content.');
        responder.send(JSON.stringify({
            content: content.toString(),
            timestamp: Date.now(),
            pid: process.pid
        }));
    });
});

// listen on TCP port 60401
responder.bind('tcp://127.0.0.1:60401', err => {
    console.log('Listening for zmq requests.')
});

// close responder when node process ends
process.on('SIGINT', () => {
    console.log('Shutting down.');
    responder.close();
});