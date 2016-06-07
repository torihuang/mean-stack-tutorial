var mongoose = require('mongoose');

module.exports = function(config) {
  // assigning localhost to host name and multivision to name of database to use
  // mongodb is creating this database if it does not already exist
  mongoose.connect(config.db)

  // variable that references the mongoose connection
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error...'))
  db.once('open', function callback() {
    console.log('multivision db opened, wahoo!')
  })
}