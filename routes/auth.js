const router = require("express").Router()
const User = require("../models/User")
const CryptoJS = require("crypto-js")
const JWT = require("jsonwebtoken")
const { verifyTokenAndAuthorization } = require("./verifyToken");



router.post('/register', async (req, res) => {

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


router.post('/login', async (req, res) => {
   try {
      const user = await User.findOne({ email: req.body.email });

      const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
      const Originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);
      Originalpassword !== req.body.password && res.status(401).json("Wrong Credentials!");
      if (user) req.session.user = { username: user.firstName }
      const accessToken = JWT.sign({
         id: user._id,
         isAdmin: user.isAdmin,

      },
         process.env.JWT_SEC,
         { expiresIn: "3d" }
      );
      const { password, ...others } = user._doc;
      res.status(200).json({ userData: { ...others }, accessToken });
   } catch (err) {
      res.status(500).json(err);
      console.error();
   }
});


router.get('/logout', verifyTokenAndAuthorization, (req, res) => {
   // Destroy the session to log the user out
   req.session.destroy((err) => {
      if (err) {
         console.error(err);
      } else {
         res.status(200).json({ message: "user logged out successfully" })
      }

   });
});

module.exports = router;