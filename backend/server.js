const app=require('./app')
const DBconnect = require('./config/database')
const dotenv=require('dotenv')
// HANDLE UNCAUGTH EXCEPTION

process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to HANDLE UNCAUGTH EXCEPTION`);
    process.exit(1)

})



dotenv.config({path:'backend/config/config.env'});

//Connect DATABASE
DBconnect();


const server=app.listen(process.env.PORT,()=>{

    console.log(`Server is Running on http://localhost:${process.env.PORT}`);
});

//UNHANDLED PROMISE REJECTION
process.on("unhandledRejection", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to UNHANDLED PROMISE REJECTION`);
//jb bhi error ay server bnd kr do,...
    server.close(()=>{
        process.exit(1)
    })
});



