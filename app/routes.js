const path = require('path');

module.exports = function(app, passport) {
  app.get('/', function(req, res) {
    res.sendFile(path.resolve(__dirname, 'static'));
  });

  app.get('/profile', isLoggedIn, function(req, res) {
    res.sendFile('shows.html', {
      user: req.user
    });
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/',
    failureFlash: true
  }));
};

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated())
    return next();

  res.redirect('/');  
}