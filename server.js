// NPM Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const shell = require('shelljs');

// Module Dependencies
const catRoutes = require('./routes/cat');
const controlRoutes = require('./routes/control');

// Constants
const streamKey = 'live_63226783_QfZTjfEHLn35A8nf5Tu0T6RRx1WYye';
const twitchURL = `rtmp://live-tyo.twitch.tv/app/${streamKey}`;

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Enable HTML template middleware
app.engine('html', require('ejs').renderFile);

// Enable static CSS styles
app.use(express.static('styles'));

app.use((req, res, next) => {
  console.log('Request from:', req.ip);
  console.log('url:', req.originalUrl);
  console.log('query:', req.query);
  console.log('body:', req.body);
  next();
});

// reply to request with "Hello World!"
app.get('/', function (req, res) {
  res.render('index.html');
});

app.get('/stream-start', (req, res) => {
  const streamVid = '/dev/video0';

  shell.exec(`ffmpeg -f v4l2 -i ${streamVid} -pix_fmt yuv420p -vcodec libx264 -s 640x360 -r 30 -g 60 -crf 23 -preset veryfast -b:v 2M -maxrate 2M -bufsize 1M -threads 6 -f flv ${twitchURL} -loglevel panic`,
    { shell: '/bin/bash' },
    (code, stdout, stderr) => {
      console.log('Exit code:', code);
      console.log('Program stdout:', stdout);
      console.log('Program stderr:', stderr);
    });

  res.send('stream started');
});

app.get('/stream-stop', (req, res) => {
  shell.exec('pkill ffmpeg', { shell: '/bin/bash' });

  res.send('stream stopped');
});

app.use('/control', controlRoutes);

app.use('/cat', catRoutes);

app.post('/sayhello', function (req, res) {
  res.send(`hello ${req.body.user}`);
});

//start a server on port 80 and log its start to our console
var server = app.listen(80, function () {

  var port = server.address().port;
  console.log('Listening on port ', port);

});
