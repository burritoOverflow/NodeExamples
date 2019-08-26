const { spawn } = require('child_process');

const child = spawn('wc');

process.stdin.pipe(child.stdin);

// send input to stdin, reads until EOF (ctrl + d), upon which the results of the wc command is displayed
child.stdout.on('data', (data) => {
    console.log(`child stdout data:\n ${data}`);
});