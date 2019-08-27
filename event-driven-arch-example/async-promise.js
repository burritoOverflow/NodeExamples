const fs = require('fs');


// note the callback calls are now replaced with promise calls
// provide a default argument for the callback in case used with 
// promise. Use a default empty argument in this example.
const readFileAsArray = function(file, callback = () => {}) {
    // this promise wraps the fs.readFile async call
    return new Promise((resolve, reject) => {
        fs.readFile(file, function (err, data) {
            if (err) {
                reject(err);
                return callback(err);
            }

            const lines = data.toString().trim().split('\n');
            resolve(lines);
            callback(null, lines);
        });
    });
};

// example call using promises
// use the catch call to handle errors
readFileAsArray('./numbers.txt')
    .then(lines => {
        const numbers = lines.map(Number);
        const oddNumbers = numbers.filter(number => number % 2 === 1);
        console.log(`Odd numbers count: ${oddNumbers.length}`);
    })
    .catch(console.error);


// example call with callback
// callback is passed as last argument to the host function
readFileAsArray('./numbers.txt', (err, lines) => {
    if (err) throw err;

    // parse the array to numbers
    const numbers = lines.map(Number);
    const oddNumbers = numbers.filter(number => number % 2 === 1);
    console.log(`Odd numbers count: ${oddNumbers.length}`);
});

// allows for programming in a manner that resembles synchronous calls
async function countOdd() {
    try {
        const lines = await readFileAsArray('./numbers.txt');
        const numbers = lines.map(Number);
        const oddNumbers = numbers.filter(number => number % 2 === 1);
        console.log(`Odd numbers count: ${oddNumbers.length}`);
    } catch (err) {
        console.error(err);
    }
}

countOdd();
console.log('Look: promises, callbacks, and async/await!');