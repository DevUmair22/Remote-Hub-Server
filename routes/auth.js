const router = require("express").Router()
const User = require("../models/User")
const CryptoJS = require("crypto-js")
const JWT = require("jsonwebtoken")




router.post('/register', async (req, res) => {

   try {
      const user = new User(
         {
            user_name: req.body.name,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
            email: req.body.email,
            phone_number: req.body.phone
         }
      )

      const savedUser = await user.save()
      res.status(201).json(savedUser)

   } catch (error) {
      res.json({ message: error })
      console.log("error registering user")
   }



})