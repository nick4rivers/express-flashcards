// jshint esversion: 6


// -- CONFIGURE EXPRESS --
// require express
const express = require('express');

// add an express router
const router = express.Router();

// -- ROUTES --

// cards
router.get('/', (req, res) => {
  res.render('card', { prompt: "Who is buried in Grant's tomb" });
});

// export the router
module.exports = router;