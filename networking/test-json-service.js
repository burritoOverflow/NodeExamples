// see pages 36 and 37 for an explanation.

'use strict'

const server = require('net').createServer(connection => {
    console.log('Subscriber connected.');
    
    // send two message chunks that comprise a whole.
    const firstChunk = '{"type": "changed", "timesta';
    const secondChunk = 'mp": 1450694370094\n';

    // send the first chunk immediately
    connection.write(firstChunk);

    // make a short delay, send the second chunk
    const timer = setTimeout(() => {
        connection.write(secondChunk);
        connection.end();
    }, 100);

    // clear timer when the connection ends.
    connection.on('end', () => {
        clearTimeout(timer);
        console.log('Subscriber disconnected.');
    });
});

server.listen(60300, function() {
    console.log('Test server listening for subscribers.');
});