const express=require("express");
const { legerCreate, getAllLegers, getLeger, updateIncom, widrawIncom, krzaDana, deleteTransections, deleteLeger } = require("../controlls/LegerController");

const routes=express.Router();

routes.route("/Create").post(legerCreate)

routes.route("/getAll").get(getAllLegers)

routes.route("/getLeger/:id").get(getLeger)

routes.route("/addMoney/:id").put(updateIncom)

routes.route("/widrawMony/:id").put(widrawIncom)

routes.route("/krzaDana").put(krzaDana)

routes.route("/deleteTransections/:id").delete(deleteTransections);

routes.route("/deleteLeger/:id").delete(deleteLeger)


module.exports=routes