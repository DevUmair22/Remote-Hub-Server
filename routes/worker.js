const router = require("express").Router()
const User = require("../models/User")
const Review = require("../models/Review")
const CryptoJS = require("crypto-js")
const JWT = require("jsonwebtoken")
const { verifyTokenAndAuthorization } = require("./verifyToken");



//Get specific Reviews

router.get('/reviews/:userId', async (req, res) => {

   try {
      const reviews =
         await Review.find({ reviewedUser: req.params.userId });
      res.status(200).json(reviews)                     //status code 200 means ok 
   } catch (error) {
      res.json({ message: error })
      console.log("error getting reviews")                         //status code 500 means internal server error
   }


})



//Add a  Review

router.post('/reviews/addNew', verifyTokenAndAuthorization, async (req, res,) => {
   try {

      const review = new Review(
         {
            reviewedUser: req.body.reviewedUser,
            reviewedBy: req.body.reviewedBy,
            rating: req.body.rating,
            comment: req.body.comment


         }
      )

      const savedReview = await review.save()
      res.status(201).json(savedReview)
   } catch (error) {
      res.json({ message: error })
      console.log("error adding review")
   }




})

//Update a Review
router.put('reviews/update/: id', verifyTokenAndAuthorization, async (req, res) => {

   try {

      const updatedReview =
         await Review.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true }
         );
      res.status(200).json(updatedReview);
   } catch (error) {

      res.json({ message: error })
      console.log("error updating review", error)
   }



})

