// jshint esversion: 6

// ------ MODULES -----------
const express = require('express');

// ---- GLOBAL CONSTANTS -----


// -------- SETUP EXPRESS -----
const app = express();
// local server for development
app.listen(3000)

// -- ROUTES --
app.get('/', (request, response) => {
  response.send('I love Jam');
});

