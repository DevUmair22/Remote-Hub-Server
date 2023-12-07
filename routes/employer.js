const router = require("express").Router();
const EmployerProfile = require("../models/EmployerProfile");
const WorkerProfile = require("../models/WorkerProfile");
const { verifyTokenAndAuthorization } = require("./verifyToken");



//Get Purchase History
router.get('/purchase-history/:userId', verifyTokenAndAuthorization, async (req, res) => {
   try {
      const userId = req.params.userId;
      const employerProfile = await EmployerProfile.findOne({ user: userId });

      if (!employerProfile) {
         return res.status(404).json({ message: 'Employer profile not found' });
      }

      res.status(200).json({ purchaseHistory: employerProfile.purchaseHistory });
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
   }
});



// Create Purchase History
router.post('/purchase-history/:userId', verifyTokenAndAuthorization, async (req, res) => {
   try {
      const userId = req.params.userId;
      console.log("first", userId)
      const { sellerId, service, invoice, fromTo, hourlyWage } = req.body;

      const employerProfile = await EmployerProfile.findOne({ user: userId });

      if (!employerProfile) {
         return res.status(404).json({ message: 'Employer profile not found' });
      }

      // Create a new purchase history entry
      const newPurchase = {
         sellerId,
         service,
         invoice,
         fromTo,
         hourlyWage: !!hourlyWage, // Convert to boolean
      };

      employerProfile.purchaseHistory.push(newPurchase);
      await employerProfile.save();

      res.status(201).json({ message: 'Purchase history created successfully', purchase: newPurchase });
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
   }
});




//  hire a worker
router.post('/hire-worker/:workerId', verifyTokenAndAuthorization, async (req, res) => {
   try {
      console.log(req.user, "=======")
      const { workerId } = req.params;
      const employerId = req.user.id;


      await WorkerProfile.findByIdAndUpdate(
         workerId,
         { $push: { hiredBy: { employerId } } },
         { new: true }
      );


      await EmployerProfile.findByIdAndUpdate(
         employerId,
         { $push: { activeHirings: workerId } },
         { new: true }
      );

      res.status(200).json({ success: true, message: 'Worker hired successfully.' });
   } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
   }
});




//terminate a worker
router.post('/terminate-worker/:workerId', verifyTokenAndAuthorization, async (req, res) => {
   try {
      const { workerId } = req.params;
      const employerId = req.user.id;


      await WorkerProfile.findByIdAndUpdate(
         workerId,
         { $pull: { hiredBy: { employerId } } },
         { new: true }
      );


      await EmployerProfile.findByIdAndUpdate(
         employerId,
         { $push: { terminatedWorkers: { workerId } } },
         { new: true }
      );

      res.status(200).json({ success: true, message: 'Worker terminated successfully.' });
   } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
   }
});


router.post('/addbilling', verifyTokenAndAuthorization, async (req, res) => {
   try {
      const userId = req.user.id;
      if (!mongoose.Types.ObjectId.isValid(userId)) {
         return res.status(400).json({ message: 'Invalid userId format' });
      }
      const employerProfile = await EmployerProfile.findOne({ user: userId });

      if (!employerProfile) {
         return res.status(404).json({ message: 'Employer profile not found' });
      }


      const billingInfo = req.body


      employerProfile.billingInfo = billingInfo;


      await employerProfile.save();

      res.status(200).json({ message: 'Billing information added successfully' });
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
   }
});

module.exports = router;