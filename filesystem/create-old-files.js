// create the test data for the script
// run this to populate the files dir with the dummy files
const fs = require('fs');
const path = require('path');
const dirname = path.join(__dirname, 'files');

fs.mkdirSync(dirname);
const ms1Day = 24 * 60 * 60 * 1000;


for (let i = 0; i < 10; i++) {
  const filepath = path.join(dirname, `file${i}`);
  fs.writeFile(filepath, i, (err) => {
    if (err) throw err;

    const time = (Date.now() - i * ms1Day)/1000;
    // the two args after the path are access and modify time
    // were using the same time here.
    fs.utimes(filepath, time, time, (err) => {
      if (err) throw err;
    });
  });
}
