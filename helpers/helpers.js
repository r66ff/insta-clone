module.exports = {
  // ensure user is logged in
  isLoggedIn: function (req, res, next) {
      if (req.isAuthenticated()){
        return next();
      }
      res.redirect('/user/login');
  }
}
