var auth = require('./auth');

module.exports = function(app) {
  app.get('/partials/*', function(req, res) {
    res.render('../../public/app/' + req.params[0]);
  })

  // Using passport in an unusual way, because we are not logging in with server side route
  // we are logging in using an xhr post
  app.post('/login', auth.authenticate);
  app.post('/logout', function(req, res) {
    req.logout();
    res.end();
  });

  // ALL requests go through star route
  // req = request, res = response
  app.get('*', function(req, res) {
    res.render('index', {bootstrappedUser: req.user});
  })
}