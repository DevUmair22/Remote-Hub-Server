const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
   const authHeader = req.headers.token;
   if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.JWT_SEC, (err, user) => {
         if (err) res.status(403).json("Token is not Valid!");
         req.user = user;
         next();
      });
   } else {
      return res.status(401).json("You are not authenticated!")                            //status code 401 means UnAuthorized
   }
};



const verifyTokenAndAuthorization = (req, res, next) => {

   verifyToken(req, res, () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
         console.log("Token verified Successfully")
         next()
      } else {
         res.status(403).json("You are not allowed to do so");                 //status code 403 means Forbidden Access
      }
   })

}


const verifyTokenAndAdmin = (req, res, next) => {
   verifyToken(req, res, () => {
      if (req.user.isAdmin) {
         console.log("Its an Admin")
         next();
      } else {

         console.log("Its not an Admin");
         res.status(403).json("You are not allowed to do so");
      }
   })

}


module.exports = { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization };