const mongoose = require("mongoose")
const ReviewSchema = mongoose.Schema({
   worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
   },
   reviewedUser: {
      type: String
   },
   reviewedBy: {
      type: String
   },
   rating: {
      type: Number
   },
   comment: {
      type: String
   }

})

module.exports = mongoose.model('Reviews', ReviewSchema)