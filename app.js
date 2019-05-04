// jshint esversion: 6

// ------ MODULES -----------
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


// -------- SETUP EXPRESS -----
// new express app
const app = express();

// tell express to use 'pug' templating
app.set('view engine', 'pug');

// tell express to use body-parser, no extended option
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());



// -- HELPERS --



// -- ROUTES --
app.get('/', (req, res) => {
  const name = req.cookies.username;
  if (name) {
    res.render('index', { name: name });
  } else {
    res.redirect('/hello');
  }
});

// goodbye
app.post('/goodbye', (req, res) => {
  res.clearCookie('username');
  res.redirect('/hello');
});

// hello

app.get('/hello', (req, res) => {
  if (req.cookies.username) {
    res.redirect('/');
  } else {
    res.render('hello');
  }
});

app.post('/hello', (req, res) => {
  res.cookie('username', req.body.username);
  res.redirect('/');
});

// cards
app.get('/cards', (req, res) => {
  res.render('card', { prompt: "Who is buried in Grant's tomb" });
});


// --- ERROR HANDLING ---

// 404 error handler
// basically, if we haven't matched a route it's gonna go 404
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// General error handler
app.use((err, req, res, nex) => {
  res.locals.error = err;
  res.status(err.status);
  // call my template, and pass the err object
  res.render('error', err);
});


// local server for development
app.listen(3000, () => {
  console.log('The application is running on localhost:3000');
});