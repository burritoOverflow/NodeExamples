const http = require('http');
const pid = process.pid;

http.createServer((req, res) => {
    // simulate a long running process
    for (let i = 0; i < 1e7; i++);
    console.log(`Response handled by process ${pid}`);
    res.end(`Response handled by process ${pid}`);
}).listen(8000, () => console.log(`Process ${pid} listening on port 8000`));