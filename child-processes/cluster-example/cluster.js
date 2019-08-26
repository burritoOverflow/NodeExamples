const os = require('os');
const cluster = require('cluster');

if (cluster.isMaster) {
    // fork for the number of cpu cores
    const cpus = os.cpus().length;
    console.log(`Forking for ${cpus}`);
    for (let i = 0; i < cpus; i++) {
        cluster.fork();
    }
} else {
    // we'll use the example server here
    require('./single-server.js');
}