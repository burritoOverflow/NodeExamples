'use strict'
const fs = require('fs');
const net = require('net');
const filename = process.argv[2];

if (!filename) {
    throw Error('Error: no file specified');
}

net.createServer(connection => {
    // Reporting
    console.log('Subscriber connected.');
    connection.write(`Now watching ${filename} for changes.`);

    // watcher setup
    const watcher =
        fs.watch(filename, () => connection.write(`File changed ${new Date()}\n`));

    // clean up
    connection.on('close', () => {
        console.log('Subscriber disconnected.');
        watcher.close();
    });
}).listen('/tmp/watcher.sock', () => console.log('Listening for subscribers.'));