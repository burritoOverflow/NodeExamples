const { spawn } = require('child_process');

// arguments are passed as an array
const child = spawn('ls', ['-la']);

// exposes the event emitter api, for example:

child.stdout.on('data', (data) => {
    console.log(`stdout data from child:\n ${data}`);
});

child.stderr.on('data', (data) => {
    console.error(`stderr data from child:\n ${data}`);
});

child.on('exit', (code, signal) => {
    console.log(`child process exited with code ${code}, signal ${signal}`);
});


// other events: disconnect, error, message, close
// child process has the standard io streams: child.stdin, child.stdout, child.stderr