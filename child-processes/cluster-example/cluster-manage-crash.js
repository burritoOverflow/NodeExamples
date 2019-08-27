const os = require('os');
const cluster = require('cluster');

if (cluster.isMaster) {
    const cpus = os.cpus().length;
    console.log(`Forking for ${cpus}`);
    for (let i = 0; i < cpus; i++) {
        cluster.fork();
    }

    console.log(`Master PID: ${process.pid}`);

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

    // when this signal is recieved, it's time for the process to restart
    // its workers. 
    process.on('SIGUSR2', () => {
        const workers = Object.values(cluster.workers);
        
        const restartWorker = (workerIndex) => {
            const worker = workers[workerIndex];
            if (!worker) return;

            worker.on('exit', () => {
                // if not true, caused by something other than disconnect call.
                if(!worker.exitedAfterDisconnect) return;
                console.log(`Exited process ${worker.process.pid}`);
                cluster.fork().on('listening', () => {
                    restartWorker(workerIndex + 1);
                });
            });
            worker.disconnect();
        }
        restartWorker(0);
    });
} else {
    // let's manage this with the server set to crash
    require('./server-uptime-crash.js');
}