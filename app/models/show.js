const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.Promise = global.Promise;

const showSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  returnDate: {
    type: String
  },
  scheduleDay: {
    type: String
  },
  scheduleTime: {
    type: String
  },
  completed: {
    type: Boolean
  },
  id: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'no id found']
  }
});



const Show = mongoose.model('Show', showSchema);

module.exports = {Show};
