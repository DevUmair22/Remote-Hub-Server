const mongoose = require("mongoose")
const ReportsSchema = mongoose.Schema({


   reporterId: {
      type: String
   },
   reportedUser: {
      type: String
   },
   reportTitle: {
      type: String
   },
   reportDescription: {
      type: String
   }

})

module.exports = mongoose.model('Reports', ReportsSchema)