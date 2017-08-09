const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

//directory where partials (partial pieces of website) are located
hbs.registerPartials(__dirname + '/views/partials');
//tell express which view engine to use (hbs)
app.set('view engine', 'hbs');
//use folder named public since path of project can change (registering middleware for express)
app.use((request, response, next) => {
  var now = new Date().toString();
  var log = `${now}: ${request.method} ${request.url}`;

  //server log file
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});
//next isn't called so rest of get requests won't process
// app.use((request, response, next) => {
//   response.render('maintenance.hbs');
//});
app.use(express.static( __dirname + '/public'));

//helper function so date is called everytime (can call in hbs (html) file)
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) =>{
  return text.toUpperCase()
});

/*http route handlers*/
//root route
app.get('/',(request, response) => {
  //render response with give template to pass to handlers syntax html (hbs page)
  response.render('home.hbs',{
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to the home page',
  });
});

//http router to about
app.get('/about',(request, response) => {
  response.render('about.hbs',{
    pageTitle: 'About Page',
  });
});

//http bad route
app.get('/bad',(request, response) => {
  response.send({
    errorMessage: 'Unable to handle request'
  });
});

//http maintenance

//bind app to port on machine
app.listen(3000, () => {
  console.log('Server is up on port 3000');
});
