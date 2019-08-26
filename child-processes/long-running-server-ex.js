const http = require('http');
const { fork } = require('child_process');

const server = http.createServer();

// note now that this allows the server to respond to multiple 
// requests, as a result of forking the long running process
server.on('request', (req, res) => {
    if (req.url === '/compute') {
        // this inital approach will block the event loop 
        // const sum = longComputation();
        // return res.end(`Sum is ${sum}`);
        const compute = fork('long-computation.js');
        compute.send('start');
        compute.on('message', sum => {
            res.end(`Sum is ${sum}`);
        })
    } else {
        res.end('ok');
    }
});

server.listen(8000, () => console.log('Running on port 8000'));
