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

//Delete User by ID
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
   try {
      await User.findByIdAndDelete(req.params.id)
      res.status(200).json("User has been deleted...")
   } catch (err) {
      res.status(500).json(err);
   }
});

//Get ALL Users
router.get('/', verifyTokenAndAdmin, async (req, res) => {
   const query = req.query.new;                          //if you write a ?new=true  in params it will store it in query
   try {
      const users = query
         ? await User.find().sort({ _id: -1 }).limit(1)            //if there a "new" query exist in param it will show the latest registered user otherwise all users
         : await User.find();
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


module.exports = router;
