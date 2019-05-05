// jshint esversion: 6

// ------ NODE MODULES -----------
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


// -------- Express Configuration -----
// new express app
const app = express();

// tell express to use body-parser, no extended option
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

// location for static files, and routed to static
app.use('/static', express.static('public'));

// tell express to use 'pug' templating
app.set('view engine', 'pug');


// -- ROUTES --
// bring in main site routes from index file
const mainRoutes = require('./routes');
app.use(mainRoutes);

// bring in cards routes
const cardRoutes = require('./routes/cards');
app.use('/cards', cardRoutes);


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