const os = require('os');
const cluster = require('cluster');

// mock function to return the number of users in a database
const numUsersDb = () => {
    this.count = this.count || 5;
    this.count = this.count * this.count;
    return this.count;
}

if (cluster.isMaster) {
    // fork for the number of cpu cores
    const cpus = os.cpus().length;
    console.log(`Forking for ${cpus}`);
    
    for (let i = 0; i < cpus; i++) {
        cluster.fork();
    }
    
    // update the worker processes with the user count
    const updateWorkers= () => {
        const userCount = numUsersDb();
        Object.values(cluster.workers).forEach(worker => {
            worker.send({ userCount});
        });
    };

    updateWorkers();
    // update this value every 10 seconds--
    // all workers recieve this value every 10 seconds over IPC channel
    setInterval(updateWorkers, 10000);
} else {
    // we'll use the example server here
    require('./single-server.js');
}