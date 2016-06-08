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

var userSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String
});
var User = mongoose.model('User', userSchema);

User.find({}).exec(function(err, collection) {
  if(collection.length === 0) {
    User.create({firstName:'Matt',lastName:'Brauer',username:'mattbrauer'});
    User.create({firstName:'Tori',lastName:'Huang',username:'torihuang'});
    User.create({firstName:'Nori',lastName:'Huang',username:'norikins'});
  }
})