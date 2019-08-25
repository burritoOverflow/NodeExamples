const { Readable } = require('stream');

// const inStream = new Readable();
//
// inStream.push('Here\s a string for consumers to consume!');
// // when null is pushed, it signals the stream has no more data.
// inStream.push(null);


// lets instead push the data on demand, when the consumer asks
// lets push the alphabet with a superficial delay of 100ms
const inStream = new Readable({
  read(size) {
    setTimeout(() => {
      if (this.currentCharCode > 90) {
        this.push(null);
        return;
      }
      this.push(String.fromCharCode(this.currentCharCode++));
      // stop at 90 (Z)
    }, 100)
  }
});

inStream.currentCharCode = 65;

// lets consume the stream by piping to stdout
inStream.pipe(process.stdout);


process.on('exit', () => {
  console.error(
    `\n\nCurrentCharCode is ${inStream.currentCharCode}`
  );
});

// handle the output eror event
process.stdout.on('error', process.exit);
