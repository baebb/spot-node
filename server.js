// NPM Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var ffmpeg = require('fluent-ffmpeg');
var fs = require('fs');


// Module Dependencies
var catRoutes = require('./routes/cat');

var app = express();

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

app.get('/test', (req, res) => {
  var streamVid = fs.createReadStream('./img/bunny.mp4');

  streamVid.on('error', function(err) {
    console.log(err);
  });

  var command = ffmpeg(streamVid)
    .preset('flashvideo')
    // .inputFormat('mp4')
    // .native()
    // .fps(15)
    // .withNoAudio()
    // .videoBitrate('4500k')
    // .videoCodec('libx264')
    // .size('640x360')
    // .autopad('black')
    // .format('flv')
    .on('start', () => console.log('Started!'))
    .on('error', (err) => console.log('An error occurred: ' + err.message))
    .on('end', () => console.log('finished processing!'))
    .save('rtmp://live-tyo.twitch.tv:1935/app/live_63226783_QfZTjfEHLn35A8nf5Tu0T6RRx1WYye');
  res.send('streaming');
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
