const ErrorHandling=require("../utils/errorHandling");

module.exports=(err,req,res,next)=>{

    err.statusCode=err.statusCode || 500;
    err.message=err.message || "NOT FOUND..."

    //Wrong Mongodb error

    if (err.name==="CastError") {
        const message=`Can NOT get Data, Invalid ${err.path}`
        err=new ErrorHandling(message, 400)
    }
       //Wrong JWT error

       if (err.name==="JsonWebTokenError") {
        const message=`json web token is invalid`
        err=new ErrorHandling(message, 400)
    }
       //JWT expire error

       if (err.name==="TokenExpiredError") {
        const message=`json web token is invalid`
        err=new ErrorHandling(message, 400)
    }

    //Mongoose duplicate key error...when you register again....



    if(err.code===11000){
        const message=`Duplicate ${Object.keys(err.keyValue)} Entered`
        err=new ErrorHandling(message,400)
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message,
    })

}