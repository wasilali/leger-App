// CREATING TOKEN AND SAVING IN COOKIE...

const someToken = (user,statusCode,res)=>{

    const token=user.getJWTToken();

    //option for cocky,...

    const options={
        expires: new Date(
            Date.now() + process.env.COOKE_EXPIRE *24*60*60*1000       //for meni second find...
        ),
        httpOnly:true,
    };

    res.status(statusCode).cookie('token',token,options).json({
        success:true,
        user,
        token,
    });
};

module.exports=someToken;
