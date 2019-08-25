// delete all files over 7 days old
const fs = require('fs');
const path = require('path');
const dirname = path.join(__dirname, 'files');

const files = fs.readdirSync(dirname);
// milliseconds in day
const ms1Day = 24 * 60 * 60 * 1000;


files.forEach(file => {
  const filepath = path.join(dirname, file);
  fs.stat(filepath, (err, stats) => {
    if (err) throw err;

    // if file not modified in the last 7 days
    if((Date.now() - stats.mtime.getTime() > 7 * ms1Day)) {
      fs.unlink(filepath, (err) => {
        if (err) throw err;
        console.log(`deleted ${filepath}`);
      });
    }
  });
});
