const express = require('express');
const app = express()
const mongoose = require('mongoose')
const port = 8080
require('dotenv/config');

//Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//DB Connection establisher
mongoose.connect(process.env.DB_CONNECTION)
   .then(() => {
      console.log('Connected to Database')
   }).catch((err) => {
      console.log(err)
   })

//To listen on the port
app.listen(port, () => {
   console.log(`Server started at http://localhost:${port}`)
})