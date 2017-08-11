//requires
var express = require('express');
var bodyParser = require('body-parser');
//custom requires
var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo');
var {Userr} = require('./models/user');

var app = express();

app.use(bodyParser.json());

//post new todo
app.post('/todos', (req,res) => {
  var todo = new Todo({
    text: req.body.text
  });
  //save todo and send
  todo.save().then((doc) => {
    res.send(doc);
  }, (error) => {
    res.status(400).send(error);
  });
});

//port
app.listen(3000, () => {
  console.log('Started on port 3000');
});
