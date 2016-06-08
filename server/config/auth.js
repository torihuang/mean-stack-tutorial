var passport = require('passport');

exports.authenticate = function(req, res, next) {
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
}