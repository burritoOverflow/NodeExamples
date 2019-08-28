const EventEmitter = require('events');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const client = new EventEmitter();
const server = require('./task-list-server')(client);

server.on('response', (response) => {
  // clears the terminal
  process.stdout.write('\u001B[2J\u001B[0;0f');
  process.stdout.write(response);
  // create a prompt
  process.stdout.write('\n\> ');
});

// emits a command event
// the server will listen for this command event
let command, args;
rl.on('line', (input) => {
  // first token is command, rest in args
  [command, ...args] = input.split(' ');
  client.emit('command', command, args);
});
