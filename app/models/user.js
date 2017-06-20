const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.Promise = global.Promise;

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {type: String, default: ''},
  lastName: {type: String, default: ''},
});

userSchema.methods.apiRepr = function() {
  return {
    username: this.username,
    firstName: this.firstName,
    lastName: this.lastName,
    _id: this._id
  };
}

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password).then(isValid => isValid);
}



userSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10).then(hash => hash);
}

const User = mongoose.model('User', userSchema);


module.exports = {User};
