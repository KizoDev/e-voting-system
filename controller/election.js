const express = require('express');
const Election = require('../models/election')
const ElectionBody = require('../models/electionBody')
const ElectionBodyAdmin = require('../models/electionBodyAdmin')
require('dotenv').config();
const authPage = require('../middleware/authPage')
const Verify = require('../routes/verifytoken')


const createElection = async (req, res) => {
  const {name, rule, address, electionDate, electionTime, electionBodyId} = req.body
  //check if electionbody id exists
  const electionBody = await ElectionBody.findOne({_id: electionBodyId});
  if(electionBody == null) {
    return res.json({
      status: 400,
      message: "Election body does not exist",
      successful: false,
    });
  }
  //check if the user trying to create election is a superadmin or an admin of the election body
const user = await ElectionBodyAdmin.findOne({electionBodyId : electionBodyId})
if(user == null) {
  return res.json({
    status: 400,
    message: "user is not allowed to create election",
    successful: false,
  });
}
 // register new user
 const election = new Election({
    name, 
    rule,
    address,
    electionDate,
    electionTime,
    electionBodyId

 })
 const savedElection = await election.save();
 

  res.json({
    status: 200,
    message: 'election created successful',
    successfull:true,
    election:savedElection
  })
}

const deleteElection = async (req, res) =>  {
  // checking if the user trying to delete election is an election body admin
  const { id: electionId } = req.params
  const deleteElection = await Election.findOneAndDelete({ _id: electionId })
  if (!deleteElection) {
    return res.json({
      status: 404,
      message: 'No election with id : ${electionId}',
      successfull:false,
      election:null
    })
  } 
   res.json({
    status: 200,
    message: 'election deleted successsfull',
    successfull:true,
    deleteElection:deleteElection
  })
}

const viewElections = async (req, res) => {         

const viewElections = await Election.aggregate([
  {
         $lookup:{
             from:"users",
             localField:"electionBodyId",
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
 if (!viewElections) {
     return res.json({
     status:401,
     massage:' no election to display' ,
     successfull:false,
     elections:null
     })
 }
 return res.json({
 status:200,
 massage: 'successfull election',
 successfull:true,
 elections:viewElections
  })
}

const updateElection = async (req, res) => {
  const { id: electionId } = req.params

  const updateElection = await Election.findOneAndUpdate({ _id: electionId }, req.body, {
    new: true,
    runValidators: true,
  })

  if (!updateElection) {
    return res.json({
      status: 404,
      message: 'No election with id : ${electionId}',
      successfull:true,
      deleteElection:null
    })
  }

  res.json({
    status: 200,
    message: 'election updated successsfull',
    successfull:true,
    deleteElection:updateElection
  })
}



  module.exports = {
    createElection,
    deleteElection,
    viewElections,
    updateElection
  }