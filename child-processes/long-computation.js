// lets block the event loop by performing a long
// calculation
const longComputation = () => {
    let sum = 0;
    for (let i = 0; i < 1e9; i++) {
        sum += i;
    };
    return sum;
};


process.on('message', () => {
    const sum = longComputation();
    process.send(sum);
});