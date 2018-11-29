// NPM Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const ffmpeg = require('fluent-ffmpeg');
const storage = require('node-persist');

// Module Dependencies
const catRoutes = require('./routes/cat');

const app = express();
// await storage.init();
let stream;

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
  // var streamVid = fs.createReadStream('./img/bunny.mp4');
  // var streamVid = './img/bunny.mp4';
  const streamVid = '/dev/video0';

  // streamVid.on('error', function(err) {
  //   console.log(err);
  // });

  stream = ffmpeg(streamVid)
    .inputFormat('v4l2')
    .videoCodec('libx264')
    .outputOptions([
      '-s 640x360',
      '-r 30',
      '-g 60',
      '-pix_fmt yuv420p',
      '-crf 23',
      '-b:v 2M',
      '-maxrate 2M',
      '-bufsize 1M'
    ])
    .noAudio()
    .flvmeta()
    .format('flv')
    .save('rtmp://live-tyo.twitch.tv/app/live_63226783_QfZTjfEHLn35A8nf5Tu0T6RRx1WYye')
    .on('start', () => console.log('Started!'))
    .on('error', (err) => console.log('An error occurred: ' + err.message))
    .on('end', () => console.log('finished processing!'));
  res.send('stream started');
});

app.get('/stream-stop', (req, res) => {
  stream.kill();
  res.send('stream stopped');
});

app.use('/cat', catRoutes);

app.post('/sayhello', function (req, res) {
  res.send(`hello ${req.body.user}`);
});

//start a server on port 80 and log its start to our console
var server = app.listen(80, function () {

  var port = server.address().port;
  console.log('Listening on port ', port);

});
