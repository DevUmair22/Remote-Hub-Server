const router = require("express").Router()
const User = require("../models/User")
const Withdrawl = require("../models/Withdrawl")
const CryptoJS = require("crypto-js")
const JWT = require("jsonwebtoken")
const { verifyTokenAndAdmin } = require("./verifyToken");



//Add new User
router.post('/addUser', verifyTokenAndAdmin, async (req, res) => {

   try {
      const user = new User(
         {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
            email: req.body.email,
            phone_number: req.body.phone,
            isAdmin: req.body.isAdmin,
            role: req.body.role
         }
      )

      const savedUser = await user.save()
      res.status(201).json(savedUser)

   } catch (error) {
      res.json({ message: error })
      console.log("error registering user")
   }



})



//Delete User by ID
router.delete('/delete/:id', verifyTokenAndAdmin, async (req, res) => {
   try {
      await User.findByIdAndDelete(req.params.id)
      res.status(200).json("User has been deleted...")
   } catch (err) {
      res.status(500).json(err);
   }
});




//Get All Users
router.get('/all', verifyTokenAndAdmin, async (req, res) => {
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


//Get All Withdrawl Requests
router.get('/withdrawl/all', verifyTokenAndAdmin, async (req, res) => {

   try {
      const requests = await Withdrawl.find();
      res.status(200).json(requests)
   } catch (err) {
      res.status(500).json(err);
      console.log(err)
   }
});




//Approve/Disapprove withdrawl requests
router.post('/withdrawl/:id', verifyTokenAndAdmin, async (req, res) => {
   const withdrawalId = req.params.id;
   console.log(withdrawalId)
   try {
      // Find the withdrawal request in the database
      const withdrawal = await Withdrawl.findById(withdrawalId);

      if (!withdrawal) {
         return res.status(404).json({ message: 'Withdrawl not found.' });
      }

      // Approve or disapprove based on the request body
      const action = req.body.action;

      if (action === 'Approved') {
         withdrawal.status = 'approved';
      } else if (action === 'Disapproved') {
         withdrawal.status = 'disapproved';
      } else {
         return res.status(400).json({ message: 'Invalid action.' });
      }

      // Save the updated withdrawal status
      await withdrawal.save();

      res.status(200).json({ message: `Withdrawal ${action}d successfully.` });
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: error });
   }
});

module.exports = router;

