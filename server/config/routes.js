
module.exports = function(app) {
  app.get('/partials/*', function(req, res) {
    res.render('../../public/app/' + req.params[0]);
  })

  // ALL requests go through star route
  // req = request, res = response
  app.get('*', function(req, res) {
    res.render('index');
  })
}