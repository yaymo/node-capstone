const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.Promise = global.Promise;

var userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {type: String},
  lastName: {type: String}
});

userSchema.methods.apiRepr = function() {
  return {
    userSchema: this.username,
    firstName: this.firstname,
    lastName: this.lastName
  };
}

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password).then(isValid => isValid);
}



userSchema.methods.hashPassword = function(password) {
  return bcrypt.hash(password, 10).then(hash => hash);
}

const User = mongoose.model('User', userSchema);


module.exports = {User};
