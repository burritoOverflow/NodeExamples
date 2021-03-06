const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const articles = [{ title: 'Example' }];

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/articles', (req, res, next) => {
  res.send(articles);
});

app.post('/articles', (req, res, next) => {
  const article = { title: req.body.title };
  articles.push(article);
  res.status(201);
  res.send(article);
});

app.get('/articles/:id', (req, res, next) => {
  const id = req.params.id;
  console.log(`Fetching ${id}`);
  res.send(articles[id]);
});

app.delete('/articles/:id', (req, res, next) => {
  const id = req.params.id;
  console.log(`Deleting ${id}`);
  delete articles[id];
  res.send({ message: 'deleted' });
});

app.listen(app.get('port'), () => {
  console.log(`Server running on ${app.get('port')}`);
});

module.exports = app;
