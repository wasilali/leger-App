const Leger = require("../modle/legerModle")
const ErrorHandling = require("../utils/errorHandling");
const catchAsyncError=require("../meddleware/catchAsyncError");



exports.legerCreate = catchAsyncError(async (req,res,next)=>{

    const {
        name,
        email,
        money
    }=req.body


    const leger=await Leger.create({
        name,email,money
    })

    res.status(200).json({
        success:true,
        message:`${name} account created successfully`
    })
   
})
    
exports.getAllLegers=catchAsyncError(async(req,res,next)=>{
    const legers= await Leger.find();

    if (!legers) {
        return next(new ErrorHandling("Not Found",400));
    }

    res.status(201).json({
        success:true,
        legers:legers.reverse()
    })
})

exports.getLeger=catchAsyncError(async(req,res,next)=>{
    const leger= await Leger.findById(req.params.id)

    if (!leger) {
        return next(new ErrorHandling("Not found",400));
    }

    res.status(201).json({
        success:true,
        leger
    })
})

exports.updateIncom=catchAsyncError(async(req,res,next)=>{
    const leger= await Leger.findById(req.params.id)
    const {moneyValue}=req.body

    if (!leger) {
        return next(new ErrorHandling("Not found",400));
    }

    leger.money =leger.money+ moneyValue

    await leger.save();

    res.status(201).json({
        success:true,
        message:`Rs ${moneyValue} is add to ${leger.name} account successfully`
    })
})

exports.widrawIncom=catchAsyncError(async(req,res,next)=>{
    const leger= await Leger.findById(req.params.id)

    if (!leger) {
        return next(new ErrorHandling("Not found",400));
    }

    leger.money -=req.body.money;

    await leger.save();

    res.status(201).json({
        success:true,
        message:"Money withdraw Successfully"
    })
})

exports.krzaDana=catchAsyncError(async(req,res,next)=>{
    const danyWala = await Leger.findById(req.query.id)
    const {money,reason}=req.body;
    const lanaWala = await Leger.findById(req.query.lanaWaliID)

    if (!danyWala) {
        return next(new ErrorHandling("Not found",400));
    }

    if (!lanaWala) {
        return next(new ErrorHandling("Not found",400));
    }

    if (danyWala.money<money) {
        return next(new ErrorHandling("You have no Enough Money",400));
    }

    lanaWala.money +=money;
    danyWala.money -=money;
    
    danyWala.transections.push({
        leyaha:lanaWala.name,
        deyaha:danyWala.name,
        transection:money,
        reason,
        add:-money,
    })

    lanaWala.transections.push({
        leyaha:lanaWala.name,
        deyaha:danyWala.name,
        transection:money,
        add:money,
        reason,
    })

    await lanaWala.save();
    await danyWala.save();


    res.status(201).json({
        success:true,
        message:`${danyWala.name} gives ${money} RS to ${lanaWala.name} thank you!`
    })
})

exports.deleteTransections = catchAsyncError(async (req, res, next) => {
    const leger = await Leger.findById(req.params.id);
    if (!leger) {
      return next(new ErrorHandling("Not found", 400));
    }
  
    // Find the index of the transaction to be deleted
    const deleteIndex = leger.transections.findIndex(
      (tran) => tran._id == req.query.moneyId
    );
  
    if (deleteIndex === -1) {
      return next(new ErrorHandling("Transaction not found", 404));
    }
  
    // Remove the transaction from the transactions array
    leger.transections.splice(deleteIndex, 1);
  
    await leger.save();
  
    res.status(201).json({
      success: true,
      message: "Deleted Successfully",
    });
  });

  exports.deleteLeger = catchAsyncError(async (req, res, next) => {
    const leger = await Leger.findByIdAndRemove(req.params.id);
  
    if (!leger) {
      return next(new ErrorHandling("Not found", 400));
    }
    
    res.status(201).json({
      success: true,
      message: "Deleted Successfully",
    });
  });