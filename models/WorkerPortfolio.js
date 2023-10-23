const mongoose = require("mongoose")
const WorkerPortfolioSchema = mongoose.Schema({



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