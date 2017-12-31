var express = require('express');
var router = express.Router();
var isLoggedIn = require('../helpers/helpers').isLoggedIn;
module.exports = function(passport) {
  // GET /user/signup
  router.get('/login', function(req, res){
    res.render('user/login',{
       title: 'Login or Sign Up'
    });
  });
  router.get('/signup', function(req, res){
    res.render('user/signup',{
       title: 'Sign Up'
    });
  });
  router.get('/profile', isLoggedIn, function(req, res){
    res.render('user/profile',{
       title: 'Hello',
       user: req.user.dataValues
    });
  });
  router.get('/logout',
    function(req, res){
      req.logout();
      res.redirect('/user/login');
    });
 // POST /user/signup
 router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: 'profile',
    failureRedirect: 'signup'
 }), function(req, res){
 });
 router.post('/login', passport.authenticate('local-login', {
    successRedirect: 'profile',
    failureRedirect: 'login'
 }), function(req, res){
   res.json({user: req.user})
 });
 return router;
};
