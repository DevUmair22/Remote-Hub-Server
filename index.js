const express = require('express');
const os = require('os');
const cors = require('cors')      //cross-origin requests
const morgan = require('morgan')       //to log request time taken
const app = express()
const mongoose = require('mongoose')       // mongoDB driver
const port = 8080
const requestLogger = morgan('tiny')
const session = require('express-session');
require('dotenv/config');             //environment file to store sensitive data
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth')
const adminRoute = require('./routes/admin')
const workerRoute = require('./routes/worker')
const employerRoute = require('./routes/employer')


// Find the local/external IP address dynamically
const interfaces = os.networkInterfaces();
let ipAddress = '';

for (const interfaceName in interfaces) {
   const interface = interfaces[interfaceName];
   for (let i = 0; i < interface.length; i++) {
      const { address, family, internal } = interface[i];
      if (family === 'IPv4' && !internal) {
         ipAddress = address;
         break;
      }
   }
   if (ipAddress) break;
}



//Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(requestLogger)
app.use(
   session({
      secret: 'your-secret-key',
      resave: false,
      saveUninitialized: false,
   })
);
app.use('/user', userRoute);
app.use('/user/auth', authRoute);
app.use('/admin', adminRoute);
app.use('/worker', workerRoute);
app.use('/employer', employerRoute);



//DB Connection establisher
mongoose.connect(process.env.DB_CONNECTION)
   .then(() => {
      console.log('Connected to Database')
   }).catch((err) => {
      console.log(err)
   })





// if an IP address was found
if (ipAddress) {

   //To listen on the port
   app.listen(port, () => {
      console.log(`Server started at http://${ipAddress}:${port}`);
   });
} else {
   console.log('Unable to determine the local IP address.');
}