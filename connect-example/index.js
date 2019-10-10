const connect = require('connect');

function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}

function hello(req, res) {
  res.setHeader('Content-Type', 'text-plain');
  res.end('Hello World');
}

connect()
  .use(logger)
  .use(hello)
  .listen(5000);

const app = connect();
app.use(logger);
app.use(hello);
app.listen(3000);
