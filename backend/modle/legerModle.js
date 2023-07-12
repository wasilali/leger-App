const mongoose = require("mongoose");

const legerScema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter Nmane'],
        maxlength:[50,"can not exceed 50 character"],
        minlength:[4,"name atleast consist on 4 character"]
    },email:{
        type:String,
        required:[true,'Please enter user email'],
        unique:true,
    },
    date:{
        type:Date,
        default:Date.now(),
    },
    transections:[
        {
            leyaha:{type:String},
            deyaha:{type:String},
            transection:{type:Number},
            add:{type:Number},
            date:{
                type:Date,
                default:Date.now(),
            },
            reason:{type:String}
        }
    ],
    money:{
        type:Number,
        default:0
    }
})

module.exports = mongoose.model("Leger",legerScema)