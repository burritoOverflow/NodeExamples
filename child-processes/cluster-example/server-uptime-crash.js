// used to simulate a server process crashing after a random
// amount of uptime
const http = require('http');
const pid = process.pid;


http.createServer((req, res) => {
    // simulate a long running process
    for (let i = 0; i < 1e7; i++);
    console.log(`Response handled by process:  ${pid}`);
    res.write(`Response handled by process ${pid}\n`);
    res.end(`Users: ${userCount}\n`);
}).listen(8000, () => console.log(`Process ${pid} listening on port 8000`));

setTimeout(() => {
    // We've crashed!
    process.exit(1);
}, Math.random() * 10000);