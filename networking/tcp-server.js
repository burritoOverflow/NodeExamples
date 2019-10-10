const net = require('net');
let clients = 0;

let server = net.createServer((client) => {
  clients++;
  let clientID = clients;
  console.log(`Client connected: ${clientID}`);
  console.log(client.remotePort);

  client.on('data', (data) => {
    console.log(`Client sent: ${data}`);
    if (data.toString().trim() === 'time') {
      client.write(`The current date is: ${new Date().toString()}`);
    } else {
      client.write(`Message recieved: ${data}`);
    }
  });

  client.on('end', () => {
    console.log(`Client disconnected ${clientID}`)
  });

  client.write(`Welcome client: ${clientID}\r\n`);
  client.pipe(client);
});

server.listen(9000, console.log('Server listening on port 9000'));
