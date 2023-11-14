const mongoose = require("mongoose")
const ReportsSchema = mongoose.Schema({


   reporterId: {
      type: String
   },
   reportedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
   },
   reportTitle: {
      type: String
   },
   reportDescription: {
      type: String
   }

})

module.exports = mongoose.model('Reports', ReportsSchema)