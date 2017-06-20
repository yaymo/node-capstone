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
  user_id: {type: String, required: true}
});



const Show = mongoose.model('Show', showSchema);

module.exports = {Show};
