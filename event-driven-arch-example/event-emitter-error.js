const fs = require('fs');
const EventEmitter = require('events');

class WithTime extends EventEmitter {
    execute(asyncFunc, ...args) {
        console.time('execute');
        this.emit('begin');
        asyncFunc(...args, (err, data) => {
            if (err) {
                return this.emit('error', err);
            }

            this.emit('data', data);
            console.timeEnd('execute');
            this.emit('end');
        });
    }
}

const withTime = new WithTime();


// with multiple listeners for the same event, invocation is in order:
withTime.on('data', (data) => console.log(`Length: ${data.length}`));
withTime.on('data', (data) => console.log(`Characters: ${data.toString().length}`));

// note that if error isn't handled with a listener, the process will exit.
withTime.on('error', console.error);

// lets create an error condition
withTime.execute(fs.readFile, '');
withTime.execute(fs.readFile, __filename);