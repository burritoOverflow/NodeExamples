// use pipes to compress a given file and encrypt it

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
.pipe(zlib.createGzip())
.pipe(crypto.createCipher('aes192', 'secretpassword'))
.pipe(progress)
.pipe(fs.createWriteStream(file + '.gz'))
.on('finish', () => process.stdout.write('done'));
