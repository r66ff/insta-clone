var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var models = require('./models');

app.use(require('cookie-parser')());
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

var passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
require('./strategies/passport-local')(passport, models.users);
var userRoutes = require('./routes/users')(passport);

app.use('/user', userRoutes);

app.set('view engine', 'pug');

app.use(express.static(__dirname + 'public'));

app.get('*', function(req, res) {
  res.status(404).send('<h1>uh oh! page not found!</h1>');
});

var server = app.listen(port, function(){
  console.log(`Open http://localhost:${port} in the browser`);
});
