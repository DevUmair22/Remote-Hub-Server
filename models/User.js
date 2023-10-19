const mongoose = require('mongoose')
const UserSchema = mongoose.Schema({

   firstName: {
      type: String,
      required: true
   },
   lastName: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   phone_number: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   },
   isAdmin: {
      type: Boolean,
      default: false
   },
   role: {
      type: String,
      required: true,

   }
}, { timestamps: true });


module.exports = mongoose.model('User', UserSchema)