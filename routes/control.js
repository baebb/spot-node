// NPM Dependencies
var express = require('express');

// Module Dependencies
const { connect, disconnect } = require('../modules/websockets');

router = express.Router();

router
  .get('/', (req, res) => {
    res.send('nothing to see here');
  })
  .get('/start', (req, res) => {
    const { channel } = req.query;

    connect(channel);

    res.send(`listening to ${channel}`)
  })
  .get('/end', (req, res) => {
    const { channel } = req.query;

    disconnect();

    res.send(`disconnecting form ${channel}`)
  });

module.exports = router;
