const router = require("express").Router()
const User = require("../models/User")
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
router.delete('delete/:id', verifyTokenAndAdmin, async (req, res) => {
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



router.post('/approve-withdrawl', verifyTokenAndAdmin, async (req, res) => {




})

module.exports = router