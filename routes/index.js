// jshint esversion: 6


// -- CONFIGURE EXPRESS --
// require express
const express = require('express');

// add an express router
const router = express.Router();

// -- ROUTES --
router.get('/', (req, res) => {
  const name = req.cookies.username;
  if (name) {
    res.render('index', { name: name });
  } else {
    res.redirect('/hello');
  }
});
  
// goodbye
router.post('/goodbye', (req, res) => {
  res.clearCookie('username');
  res.redirect('/hello');
});
  
// hello  
router.get('/hello', (req, res) => {
  if (req.cookies.username) {
    res.redirect('/');
  } else {
    res.render('hello');
  }
});
  
router.post('/hello', (req, res) => {
  res.cookie('username', req.body.username);
  res.redirect('/');
});

module.exports = router;