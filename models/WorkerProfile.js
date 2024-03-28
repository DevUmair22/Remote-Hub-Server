const mongoose = require('mongoose')
const WorkerProfileSchema = mongoose.Schema({


   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
   },

   designation: {
      type: String,
   },
   hourlyRate: {
      type: String
   },
   totalJobs: {
      type: Number
   },
   ratings: {
      type: Number
   },
   about: {
      type: String,
   },
   location: {
      type: String,
   },
   experience: [
      {
         totalExperience: {
            type: String,
         },
         organizationName: {
            type: String,
         },

         roles: [
            {
               title: {
                  type: String,
               },
               fromTo: {
                  type: String,
               },
               skillsInvolved: {
                  type: Array,
               },
               roleDescription: {
                  type: String,
               }
            }],

      }
   ],

   skills: {
      type: Array,

   },
   portfolio: {
      type: Array,

   },
   earnings: {
      type: Number,

   },
   projectHistory: {
      type: Array,
   },
   languages: {
      type: Array,
   },
   socialAccounts: [
      {
         link: {
            type: String,
         },
         verificationStatus: {
            type: Boolean,
            default: false,
         }
      },
   ],
   familiarTools: {
      type: Array,
   },
   achievements: [
      {
         title: {
            type: String,
         },
         link: {
            type: String,
         }
      }
   ],
   hiredBy: [
      {
         employerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
         },
         hireDate: {
            type: Date,
            default: Date.now,
         },
      },
   ],



})

module.exports = mongoose.model('WorkerProfile', WorkerProfileSchema)
