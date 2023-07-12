const jwt = require("jsonwebtoken");
const User = require("../models/userModle");
const ErrorHandling = require("../utils/errorHandling");
const catchAsyncError = require("./catchAsyncError");


exports.isAuthenticatedUser= catchAsyncError( async(req,res,next)=>{

    const { token }= req.cookies

    if (!token) {
        return next( new ErrorHandling("Please login to access to this resouece",401));
    }
    const decodeData= jwt.verify(token,process.env.JWT_SECRET);

   req.user= await User.findById(decodeData.id);

   next();
});

exports.authorizeRoles=(...roles)=>{
    return (req,res,next)=>{
        if (!roles.includes(req.user.role)) {
          return next(  new ErrorHandling(`Role ${req.user.role} is not allowed access this resouse `,403)
          
          )};
        next();
    }
}
