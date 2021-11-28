const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 8083;

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/myapi/heroes', (req, res) => {
  const myList = [
    { name: 'John', age: 39 },
    { name: 'Sarah', age: 26 },
  ];
  res.send(myList);
});

const userFiles = path.join(__dirname, 'upload');
app.put('/myapi/files', (req, res) => {
  const file = req.body;
  const base64data = file.content.replace(/^data:.*,/, '');
  const location = path.join(userFiles, file.name);
  fs.writeFile(location, base64data, 'base64', (err) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.status(200);
      res.send({ location });
    }
  });
});

app.use('/dragdrop/', express.static('dist'));

app.get('/dragdrop/*', (req, res) => {
  res.sendFile('./dist/index.html', { root: __dirname });
});

app.listen(port, () => {
  console.log('app is started and listening to the port: ', port);
});
