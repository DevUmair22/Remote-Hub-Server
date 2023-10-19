const router = require("express").Router();
const User = require("../models/User");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const CryptoJS = require("crypto-js")


//Update a User by ID
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {

   if (req.body.password) {

      req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString();
   }
   try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id,
         { $set: req.body },
         { new: true }
      );
      res.status(200).json(updatedUser);
   } catch (err) {
      res.status(500).json(err);
   }



});


//Get ALL Users
router.get('/', async (req, res) => {
   const query = req.query.new;
   try {
      const users =
         await User.find();
      res.status(200).json(users)                     //status code 200 means ok 
   } catch (err) {
      res.status(500).json(err);                             //status code 500 means internal server error
   }
});

//Get User Stats
router.get('/stats', verifyTokenAndAdmin, async (req, res) => {

   const date = new Date();
   const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));                 //date(date.set(todayDate.get-1))

   try {
      const data = await User.aggregate([
         { $match: { createdAt: { $gte: lastYear } } },       //if last year it will store it in createdAt variable
         {
            $project: {
               month: { $month: "$createdAt" },   //stores the number of month when created into month variable
            },
         },
         {
            $group: {
               _id: "$month",                //returns json data of group ordered respectively with month number and total number of registrations in that month
               total: { $sum: 1 },
            },
         },

      ]);
      res.status(200).json(data);           //status code 200 means ok 
   } catch (err) {
      res.status(500).json(err);                 //status code 500 means internal server error
   }

})



router.post('report', verifyToken)

module.exports = router;