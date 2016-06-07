var passport = require('passport');

module.exports = function(app) {
  app.get('/partials/*', function(req, res) {
    res.render('../../public/app/' + req.params[0]);
  })

  // Using passport in an unusual way, because we are not logging in with server side route
  // we are logging in using an xhr post
  app.post('/login', function(req, res, next) {
    // Create auth function
    var auth = passport.authenticate('local', function(err, user) {
      if(err) {return next(err);}
      if(!user) { res.send({success:false})}

      // Won't need this if using passport as is typical
      req.logIn(user, function(err) {
        if(err) {return next(err);}
        res.send({success: true, user: user})
      })
    })

    // Call auth function
    auth(req, res, next);
  })

  // ALL requests go through star route
  // req = request, res = response
  app.get('*', function(req, res) {
    res.render('index');
  })
}