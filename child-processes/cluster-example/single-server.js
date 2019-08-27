const http = require('http');
const pid = process.pid;

let userCount;

http.createServer((req, res) => {
    // simulate a long running process
    for (let i = 0; i < 1e7; i++);
    console.log(`Response handled by process:  ${pid}`);
    res.write(`Response handled by process ${pid}\n`);
    res.end(`Users: ${userCount}\n`);
}).listen(8000, () => console.log(`Process ${pid} listening on port 8000`));

// upon reciept of message, update the user count with this value
process.on('message', msg => {
    userCount = msg.userCount;
})