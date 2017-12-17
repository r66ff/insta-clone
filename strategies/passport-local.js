module.exports = function(passport, users) {
  var LocalStrategy = require('passport-local').Strategy;
  var UserModel = users;
  var bcrypt = require('bcrypt');
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, processSignupCallback));

  passport.use('local-login', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
  }, processLoginCallback));

  function processSignupCallback(req, email, password, done) {
   // first search to see if a user exists in our system with that email
   console.log(req.body);
   UserModel.findOne({
     where: {
       'email' : email
     },
     attributes: ['id']
   })
   .then(function(user) {
     if (user) {
       // user exists call done() passing null and false
       return done(null, false);
     }
     else {
       // create the new user
       var userToCreate = req.body;
       bcrypt.hash(userToCreate.password, 10, function(err, hash){
         userToCreate.password = hash;
         UserModel.create(userToCreate).then(function(createdRecord){
           createdRecord.password = undefined;
           return done(null, createdRecord);
         });
       });
     }
   });
  }

  function processLoginCallback(email, password, done) {
     // first let's find a user in our system with that email
     UserModel.findOne({
       where: {
       'email' : email
       }
     })
     .then(function(user) {
       if (!user) {
       return done(null, false)
       }
       // make sure the password they provided matches what we have
       // (think about this one, before moving forward)
       bcrypt.compare(password, user.password, function(err, result) {
         user.password = undefined;
         return result ? done(null, user) : done(null, false);
       });
     });
    }
};
