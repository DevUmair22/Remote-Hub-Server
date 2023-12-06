const mongoose = require("mongoose")
const EmployerProfileSchema = mongoose.Schema({
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
   },
   name: {
      type: String,
   },
   billingInfo:
   {
      fullname: {
         type: String,
      },
      companyName: {
         type: String,
      },
      country: {
         type: String,
      },
      state: {
         type: String,
      },
      billingAddress: {
         type: String,
      },
      city: {
         type: String,
      },
      postalCode: {
         type: String,
      },
      vat_number: {
         type: String,
      },


      cardInformation: [
         {
            cardNumber: {
               type: Number,
               required: true
            },
            exp: {
               type: String,
               required: true,
            },
            securityCode: {
               type: Number,
               required: true
            },
            firstName: {
               type: String,
               required: true,
            },
            lastName: {
               type: String,
               required: true,
            },

         }
      ]
   }
   ,
   purchaseHistory: [
      {
         sellerId: {
            type: String
         },
         service: {
            type: String,
         },
         invoice: {
            type: String
         },
         fromTo: {
            type: String
         },
         hourlyWage: {
            type: Boolean,
            default: true,
         },


      },
   ],
   activeHirings:
   {

      type: Number,



   },
   reportedUsers: [
      {
         userId: {
            type: String
         },
         issueTitle: {
            type: String,
         },
         issueDescription: {
            type: String,
         },
      }
   ],







})

module.exports('EmployerProfile', EmployerProfileSchema)