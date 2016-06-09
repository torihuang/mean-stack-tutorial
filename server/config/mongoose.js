var mongoose = require('mongoose'),
  crypto = require('crypto');

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
  username: String,
  salt: String,
  hashed_pwd: String,
  roles: [String]
});
userSchema.methods = {
  authenticate: function(passwordToMatch) {
    return hashPwd(this.salt, passwordToMatch) == this.hashed_pwd;
  }
}
var User = mongoose.model('User', userSchema);

User.find({}).exec(function(err, collection) {
  if(collection.length === 0) {
    var salt, hash;

    salt = createSalt();
    hash = hashPwd(salt, 'password');
    User.create({firstName:'Matt',lastName:'Brauer',username:'mattbrauer', salt: salt, hashed_pwd: hash, roles:['admin']});

    salt = createSalt();
    hash = hashPwd(salt, 'password');
    User.create({firstName:'Tori',lastName:'Huang',username:'torihuang', salt: salt, hashed_pwd: hash, roles:[]});

    salt = createSalt();
    hash = hashPwd(salt, 'password');
    User.create({firstName:'Nori',lastName:'Huang',username:'norikins', salt: salt, hashed_pwd: hash});
  }
})

function createSalt() {
  return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt, pwd) {
  var hmac = crypto.createHmac('sha1', salt);
  hmac.write(pwd);
  hmac.end();
  return hmac.read();
}