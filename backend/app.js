const express=require('express')


const app=express()
const cors=require("cors")

const errorMeddleware=require("./meddleware/error")

app.use(cors());
app.use(express.json({limit:'50mb'}))
//route
const leger = require('./router/legerRoute')
app.use('/api/v1',leger);



app.use(errorMeddleware)


module.exports=app;