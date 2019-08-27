const fs = require('fs');

const readFileAsArray = function(file, callback) {
    fs.readFile(file, function(err, data) {
        if (err) {
            return callback(err);
        }

        const lines = data.toString().trim().split('\n');
        callback(null, lines);
    });
};

// example call
// callback is passed as last argument to the host function
readFileAsArray('./numbers.txt', (err, lines) => {
    if (err) throw err;
    
    // parse the array to numbers
    const numbers = lines.map(Number);
    const oddNumbers = numbers.filter(number => number % 2 === 1);
    console.log(`Odd numbers count: ${oddNumbers.length}`);
});