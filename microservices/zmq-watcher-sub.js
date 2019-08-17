'use strict'
const zmq = require('zeromq');

// create subscriber endpoint
const subscriber = zmq.socket('sub');

// subscribe to all messages
subscriber.subscribe('');

// handle publisher's messages 
subscriber.on('message', data => {
    const message = JSON.parse(data);
    const date = new Date(message.timestamp);
    console.log(`${message.file} changed at ${date}`);
});
subscriber.connect("tcp://localhost:60400")