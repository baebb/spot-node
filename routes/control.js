// NPM Dependencies
var express = require('express');
const shell = require('shelljs');

// Module Dependencies
const { connect, disconnect } = require('../modules/websockets');

router = express.Router();

router
  .get('/', (req, res) => {
    res.send('nothing to see here');
  })
  .get('/start', (req, res) => {
    const { channel = 'controls' } = req.query;

    connect(channel);
    shell.exec('motion start',
    { shell: '/bin/bash' },
    (code, stdout, stderr) => {
      console.log('Exit code:', code);
      console.log('Program stdout:', stdout);
      console.log('Program stderr:', stderr);
    });

    res.send(`listening to ${channel}`)
  })
  .get('/end', (req, res) => {
    // const { channel } = req.query;

    disconnect();

    res.send(`disconnecting`)
  });

module.exports = router;
