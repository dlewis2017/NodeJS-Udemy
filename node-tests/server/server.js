const express = require('express');

var app = express();

app.get('/', (req, res) => {
  res.status(404).send({
    error: 'Page not found.',
    name: 'Todo App v1.0'
  });
});

app.get('/users', (req,res) => {
  res.send([{
    name:'David',
    age:22
  },{
    name:'Matthew',
    age: 23
  }, {
    name: 'Gio',
    age: 21
  }, {
    name: 'Jack',
    age:24
  }]);
});

app.listen(3000);
module.exports.app = app;
