const { exec } = require('child_process');

// exec uses a shell for the command, so direct shell syntax is possible
// exec buffers the result of the command, so using spawn is a better choice for a 
// large output
exec('find . -type f | wc -l', (err, stdout, stderr) => {
    if (err) {
        console.error(err);
    }
    console.log(`Number of files ${stdout}`);
});