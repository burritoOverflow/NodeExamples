const { spawn } = require('child_process');

// shell mode
// we can also use additional arguments:
const child = spawn('node https_server/http-server-routing.js', {
    stdio: 'inherit',
    shell: true,
    cwd: '..',
    env: {}     // note, with this argument, the child process will no longer have access to the parent process' environment variables
});