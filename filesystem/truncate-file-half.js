// given a directory with files where the content is duplicated twice
// truncate those files appropriately

const fs = require('fs');
const path = require('path');
const dirname = path.join(__dirname, 'files');

const files = fs.readdirSync(dirname);

// gives an array of filenames, path not included.
files.forEach(file => {
  // create the filepath for each file
  const filePath = path.join(dirname, file);
  // async method used, as there's multiple files to process
  fs.stat(filePath, (err, stats) => {
    if (err) throw err;

    // now truncate it by half the size, for this example, size
    // is sufficient
    fs.truncate(filePath, stats.size/2, (err) => {
      if (err) throw err;
    });
  });
});
