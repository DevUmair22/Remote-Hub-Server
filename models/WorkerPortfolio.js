const mongoose = require("mongoose")
const WorkerPortfolioSchema = mongoose.Schema({


   worker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
   },
   projectName: {
      type: String
   },
   projectDescription: {
      type: String
   },
   technologiesUsed: {
      type: Array
   },
   images: {
      type: String
   },


})

module.exports('WorkerPortfolio', WorkerPortfolioSchema)