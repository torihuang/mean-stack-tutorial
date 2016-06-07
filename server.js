var express = require('express'),
  stylus = require('stylus'),
  logger = require('morgan'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose');

// Returns environment if it's been set by node
var env = process.env.NODE_ENV || 'development';

var app = express();

function compile(str, path) {
  return stylus(str).set('filename', path);
}

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(stylus.middleware(
  {
    src: __dirname + '/public',
    compile: compile
  }
));

app.use(express.static(__dirname + '/public'));

// assigning localhost to host name and multivision to name of database to use
// mongodb is creating this database if it does not already exist
if (env == 'development') {
  mongoose.connect('mongodb://localhost/multivision')
} else {
  mongoose.connect('mongodb://torihuang:multivision@ds025603.mlab.com:25603/multivision')
}

// variable that references the mongoose connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'))
db.once('open', function callback() {
  console.log('multivision db opened, wahoo!')
})

// REMOVE LATER
var messageSchema = mongoose.Schema({message: String});
var Message = mongoose.model('Message', messageSchema);
var mongoMessage;
Message.findOne().exec(function(err, messageDoc) {
  mongoMessage = messageDoc.message;
});

app.get('/partials/:partialPath', function(req, res) {
  res.render('partials/' + req.params.partialPath);
})

// ALL requests go through star route
// req = request, res = response
app.get('*', function(req, res) {
  res.render('index', {mongoMessage: mongoMessage});
})

var port = process.env.PORT  || 8080;
app.listen(port);
console.log('Nihao from port ' + port + '...');