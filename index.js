var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var models = require('./models');

var passport = require('passport');
app.use(passport.initialize());
require('./strategies/passport-local')(passport, models.users);
var userRoutes = require('./routes/users')(passport);

app.use('/user', userRoutes);

app.set('view engine', 'pug');

app.use(express.static(__dirname + 'public'));

app.get('/user/login', function(req, res){
  res.render('user/login',{
     title: 'Login or Sign Up'
  });
});
app.get('/user/signup', function(req, res){
  res.render('user/signup',{
     title: 'Sign Up'
  });
});
app.get('/user/profile', function(req, res){
  res.render('user/profile',{
     title: 'Welcome!'
  });
});

app.get('*', function(req, res) {
  res.status(404).send('<h1>uh oh! page not found!</h1>');
});

var server = app.listen(3330, function(){
  console.log('Open http://localhost:3330 in the browser');
});
