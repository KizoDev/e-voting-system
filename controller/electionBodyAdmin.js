const express = require('express');
const router = express.Router()
const Verify = require("../routes/verifytoken")
const ElectionBodyAdmin = require('../models/electionBodyAdmin')
require('dotenv').config();



const createElectionBodyAdmin = async (req, res) => {
 // register new user
 const electionBodyAdmin = new ElectionBodyAdmin({ 
    electionBodyId:req.body.electionBodyId,
    electoralBodyAdminId :req.body.userId
 })
 const savedElectionBodyAdmin = await electionBodyAdmin.save();
 

  res.json({
    status: 200,
    message: 'registerd successful',
    successfull:true,
    electionBodyAdmin:savedElectionBodyAdmin
  })
}

const deleteElectionBodyAdmin = async (req, res) =>  {
  const { id: electionBodyAdminId } = req.params
  const electionBodyAdmin = await ElectionBodyAdmin.findOneAndDelete({ _id: electionBodyAdminId })
  if (!electionBodyAdmin) {
    return res.json({
      status: 404,
      message: 'No election body admin with the id ',
      successfull:false,
      election:null
    })
  } 
   res.json({
    status: 200,
    message: 'electionbodyAdmin deleted successsfull',
    successfull:true,
    deleteElection:electionBodyAdminId
  })
}

const viewelectionbodyAdmin = async (req, res) => {         

const electionbodyAdmin = await ElectionBodyAdmin.aggregate([
  {
         $lookup:{
             from:"users",
             localField:"electoralBodyAdminId",
             foreignField:"_id",
             as:"users",
         },
     },
     {
       $unwind:{
         path: "$users",
       preserveNullAndEmptyArrays: true,
       }
     },
])
.exec()
 if (!electionbodyAdmin) {
     return res.json({
     status:401,
     massage:' no electionbody to display' ,
     successfull:false,
     elections:null
     })
 }
 return res.json({
 status:200,
 massage: 'successfull electionbody',
 successfull:true,
 electionbodys:electionbodyAdmin
  })
}

const updateelectionBodyAdmin = async (req, res) => {
  const { id: electionbodyAdmin } = req.params

  const updateElectionbodyAdmin = await ElectionBodyAdmin.findOneAndUpdate({ _id: electionbodyAdmin }, req.body, {
    new: true,
    runValidators: true,
  })

  if (!updateElectionbodyAdmin) {
    return res.json({
      status: 404,
      message: 'No electionBody with id : ${electionId}',
      successfull:true,
      Electionbody:null
    })
  }

  res.json({
    status: 200,
    message: 'electionbody updated successsfull',
    successfull:true,
    Electionbody:updateElectionbodyAdmin
  })
}
  module.exports = {
    createElectionBodyAdmin,
    deleteElectionBodyAdmin,
    viewelectionbodyAdmin,
    updateelectionBodyAdmin
  }