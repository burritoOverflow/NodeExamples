const os = require('os');
const cluster = require('cluster');

if (cluster.isMaster) {
    const cpus = os.cpus().length;
    console.log(`Forking for ${cpus}`);
    for (let i = 0; i < cpus; i++) {
        cluster.fork();
    }

    // register a handler for exit
    cluster.on('exit', (worker, code, signal) => {
        // fork a new process if a worker exits
        // check that the process stoppped due to an error
        // and not from a user gracefully stoppping the process,
        // or from the master stopping the worker.
        if (code !== 0 && !worker.exitedAfterDisconnect) {
            console.log(`Worker ${worker.id} crashed. ` +
                'Starting a new worker.');
            cluster.fork();
        }
    });
} else {
    // let's manage this with the server set to crash
    require('./server-uptime-crash.js');
}