const mongoose=require('mongoose');




const DBconnect=()=>{
    mongoose.connect(process.env.MONGODB_URI,{    useNewUrlParser: true,
        // useCreateIndex: true,
        useUnifiedTopology: true}).then((data)=>{
        console.log(`mongodb running...${data.connection.host}`);
        })
}


module.exports= DBconnect