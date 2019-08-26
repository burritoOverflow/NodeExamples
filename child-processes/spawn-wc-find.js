const { spawn } = require('child_process');

// find all in cwd of type file
const find = spawn('find', ['.', '-type', 'f']);

// l arg is for number of lines--the result of this will be the 
// number of files in cwd
const wc = spawn('wc', ['-l']);

// pipe the output of the find command to the input of the 
// word (line here) count command
find.stdout.pipe(wc.stdin);

wc.stdout.on('data', (data) => {
    console.log(`Number of files:\n ${data}`);
});