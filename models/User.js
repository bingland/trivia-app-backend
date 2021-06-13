const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  verified: Boolean,
  dateCreated: Date
}, { collection: 'users' })

module.exports = mongoose.model('User', UserSchema)