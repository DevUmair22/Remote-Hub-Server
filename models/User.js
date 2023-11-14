const mongoose = require('mongoose')
const UserSchema = mongoose.Schema({
   workerProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'WorkerProfile',
   },

   employerProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'EmployerProfile',
   },

   reports: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Reports',
      }
   ],

   reviews: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'Review',
      }
   ],

   workerPortfolios: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'WorkerPortfolio',
      }
   ],
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