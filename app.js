// jshint esversion: 6

// ------ MODULES -----------
const express = require('express');
const bodyParser = require('body-parser');


// -------- SETUP EXPRESS -----
// new express app
const app = express();

// tell express to use 'pug' templating
app.set('view engine', 'pug');

// tell express to use body-parser, no extended option
app.use(bodyParser.urlencoded({extended: false}));

// local server for development
app.listen(3000, () => {
  console.log('The application is running on localhost:3000');
});

// -- HELPERS --

// -- ROUTES --
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/cards', (req, res) => {
  res.render('card', {prompt: "Who is buried in Grant's tomb"});
});

app.get('/hello', (req, res) => {
  res.render('hello');
});

app.post('/hello', (req, res) => {
  res.render('hello', { name: req.body.username });
});