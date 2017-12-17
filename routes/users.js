var express = require('express');
var router = express.Router();
module.exports = function(passport) {
 // POST /user/signup
 router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: 'profile',
    failureRedirect: 'signup'
 }), function(req, res){
 });
 router.post('/login', passport.authenticate('local-login'),
 function(req, res){
   res.json({user: req.user})
 });
 return router;
};
