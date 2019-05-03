// jshint esversion: 6

// ------ MODULES -----------
const express = require('express');

// -------- SETUP EXPRESS -----
// new express app
const app = express();

// tell express to use 'pug' templating
app.set('view engine', 'pug');

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
