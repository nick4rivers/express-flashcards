// jshint esversion: 6


// -- CONFIGURE EXPRESS --
// require express
const express = require('express');

// add an express router
const router = express.Router();

// ----- STATIC DATA FILE --------
const data = require('../data/flashcardData.json').data;
const cards = data.cards;

// -- ROUTES --
// cards: note, all routes already have '/cards'
router.get('/', (req, res) => {
  const cardId = Math.floor(Math.random() * data.cards.length);
  res.redirect(`/cards/${cardId}?side=question`);
});

// this also sets up a query string '2/?=side=question'
router.get('/:id', (req, res) => {
  // first get parameters from cookies
  const name = req.cookies.username;
  
  // query the request params id
  const id = req.params.id;
  
  // query the query string
  const side = req.query.side;
  
  // if no query string just redirect and set it to question
  if (!side) {
    return res.redirect(`/cards/${id}?side=question`);
  }

  // query the json
  const text = cards[id][side];
  
  // again, query the json
  const hint = cards[id].hint;
  
  // declare template data with first property text as the text from above
  // and add any additional properties
  const templateData = {};
  templateData.text = text;
  templateData.id = id;
  templateData.name = name;

  // logic for the card flipper, it's weird, you flip to what doesn't come from the current query string
  if (side === 'answer') {
    templateData.sideToShow = 'question';
    templateData.sideToDisplay = 'answer';
  } else if (side === 'question') {
    templateData.hint = hint;
    templateData.sideToShow = 'answer';
    templateData.sideToDisplay = 'question';
  }

  // Finally, pass the templateData object as part of the response
  res.render('card', templateData);
});

// export the router for use in our app.js
module.exports = router;