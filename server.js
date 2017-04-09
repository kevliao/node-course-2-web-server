const express = require('express');
const hbs = require('hbs'); // handlebar extension
const fs = require('fs');

const port = process.env.PORT || 3000 // process.env is object that stores all env variables as key value pairs
var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n'); // adds onto file; for node v7>, need (err)
  next();
});

// app.use((req, res, next) => {  // sets up maintenance middleware, stops every thing after it from executing (no next())
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));  // ex of middleware, app.use registers middleware

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  //res.send('<h1>Hello Express!</h1>');
  res.render('home.hbs', {
    pageTitle: 'home page',
    welcomeMessage: 'hello kl'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'about page'
  });
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

// dynamic variable, envr variable PORT that Heroku set, will change, using SET on windows
app.listen(port, () => {
  console.log(`server is up on port ${port}`);
});


