var express = require('express');
var bodyParser = require('bodyparser');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {Userr} = require('./models/user');

var app = express();

app.listen(3000, () => {
  console.log('Started on port 3000');
});
