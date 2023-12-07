const router = require("express").Router();
const User = require("../models/User");

const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");
const CryptoJS = require("crypto-js")
const Review = require('../models/Review')
const Withdraw = require('../models/Withdrawl')



router.post('/reviewUser', verifyTokenAndAuthorization, async (req, res) => {

   try {
      const Review = new Review({
         reviewedUser: req.body.reviewedUser,
         reviewedBy: req.body.reviewedBy,
         rating: req.body.rating,
         comment: req.body.comment

      })



      const savedReview = Review.save()
      res.status(201).json(savedReview)

   } catch (error) {
      res.status(500).json(err)
   }



})


//Update a User by password by ID
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


//Update a User by ID
router.put('/basic/:id', verifyTokenAndAuthorization, async (req, res) => {


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


//Withdrawl Request 
router.post('/withdrawl', verifyTokenAndAuthorization, async (req, res) => {
   try {
      const withdrawl = new Withdraw({
         userId: req.user.id,
         amount: req.body.amount,


      })



      const savedRequest = await withdrawl.save()
      res.status(201).json(savedRequest)

   } catch (error) {
      res.status(500).json(err)
   }

})



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




// router.post('report', verifyToken)

module.exports = router;
