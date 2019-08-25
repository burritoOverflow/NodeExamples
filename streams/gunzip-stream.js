// the companion for the gzip stream--decrypts and unzips the file

const fs = require('fs');
const zlib = require('zlib');
const file = process.argv[2];
const crypto = require('crypto');

const { Transform } = require('stream');

const progress = new Transform({
  transform(chunk, encoding, callback) {
    process.stdout.write('.');
    callback(null, chunk);
  }
});

fs.createReadStream(file)
  .pipe(crypto.createDecipher('aes192', 'secretpassword'))
  .pipe(zlib.createGunzip())
  .pipe(progress)
  // to ignore the .gz extension on the file
  .pipe(fs.createWriteStream(file.slice(0, -3)))
  .on('finish', () => process.stdout.write('complete'));
