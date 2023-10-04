const mongoose = require('mongoose')
const UserSchema = mongoose.Schema({

   user_name: {
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
   }
}, { timestamps: true });


module.exports = mongoose.model('User', UserSchema)