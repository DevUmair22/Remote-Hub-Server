const router = require("express").Router()
const User = require("../models/User")
const CryptoJS = require("crypto-js")
const JWT = require("jsonwebtoken")
const { verifyTokenAndAuthorization } = require("./verifyToken");


router.get('/', verifyTokenAndAuthorization, (req, res, () => {




}))


router.post('/addReview', verifyTokenAndAuthorization, (req, res, () => {




}))


router.put('/updateReview', verifyTokenAndAuthorization, (req, res, () => {




}))

