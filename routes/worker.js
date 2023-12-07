const router = require("express").Router()
const WorkerProfile = require('../models/WorkerProfile')
const Review = require("../models/Review")
const { verifyTokenAndAuthorization } = require("./verifyToken");


//---------------Worker Review's Methods------------

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

//Add a Review
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

//Update a Review--not using
router.put('/reviews/update/: id', verifyTokenAndAuthorization, async (req, res) => {

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


//-----------------------------------------Worker Profile Methods------------

//Create Worker Profile
router.post('/newProfile', verifyTokenAndAuthorization, async (req, res) => {
   try {
      const userId = req.user.id;
      console.log(req.body, userId)

      const profile = new WorkerProfile({
         user: userId,
         designation: req.body.designation,
         about: req.body.about,
         location: req.body.location,
         experience: req.body.experience.map((exp) => ({
            organizationName: exp.organizationName,
            totalExperience: exp.totalExperience,
            roles: exp.roles.map((role) => ({
               title: role.title,
               fromTo: role.fromTo,
               skillsInvolved: role.skillsInvolved,
               roleDescription: role.roleDescription,
            })),
         })),
         skills: req.body.skills,
         portfolio: req.body.portfolio,
         earnings: req.body.earnings,
         projectHistory: req.body.projectHistory,
         languages: req.body.languages,
         socialAccounts: req.body.socialAccounts.map((account) => ({
            link: account.link,
            verificationStatus: account.verificationStatus,
         })),
         familiarTools: req.body.familiarTools,
         achievements: req.body.achievements.map((achievement) => ({
            title: achievement.title,
            link: achievement.link,
         })),
      });

      const savedProfile = await profile.save();
      res.status(201).json(savedProfile);
   } catch (error) {
      res.status(500).json({ message: error.message });
      console.log("Error adding profile:", error);
   }
});

//Get Worker Profile by id
router.get('/profile/:id', async (req, res) => {

   try {
      const worker =
         await WorkerProfile.findOne({ _id: req.params.id });
      res.status(200).json(worker)                     //status code 200 means ok 
   } catch (error) {
      res.json({ message: error })
      console.log("error getting worker Profile")                         //status code 500 means internal server error
   }


})


//Get Worker Profile
router.get('/allWorkers', async (req, res) => {
   try {
      const worker =
         await WorkerProfile.find();
      res.status(200).json(worker)
   } catch (error) {
      res.json({ message: error })
      console.log("error getting worker Profile")
   }
})

//Update Worker profile
router.put('/profile/update/:id', verifyTokenAndAuthorization, async (req, res) => {

   try {

      const updatedProfile =
         await WorkerProfile.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true }
         );
      res.status(200).json(updatedProfile);
   } catch (error) {

      res.json({ message: error })
      console.log("error updating worker profile", error)
   }



})





module.exports = router