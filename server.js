var express = require('express');
var bodyParser = require('body-parser');
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

app.get('/cat', function (req, res) {
  res.send('You hit cat');
});

app.post('/dog', function (req, res) {
  res.send(`yooo ${req.user}`);
});

//start a server on port 80 and log its start to our console
var server = app.listen(80, function () {

  var port = server.address().port;
  console.log('Listening on port ', port);

});
