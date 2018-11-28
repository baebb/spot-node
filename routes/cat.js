// NPM Dependencies
var express = require('express');

router = express.Router();

router
  .get('/', (req, res) => {
    res.send(`cat does not know ${req.query.question}`);
  })
  .get('/dog', (req, res) => {
    res.send(`dog does not know ${req.query.question}`);
  });

module.exports = router;
