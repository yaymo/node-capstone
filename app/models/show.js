const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.Promise = global.Promise;

const showSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  returnDate: {
    type: Date
  },
  schedule: {
    day: { type: String },
    time: {type: String }
  },
  id: {
    type: String
  }
});

const Show = mongoose.model('Show', showSchema);

module.exports = {Show};
