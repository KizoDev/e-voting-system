const express = require('express');
const Voter = require('../models/voters')
const authPage = require('../middleware/authPage')
const Verify = require('../routes/verifytoken')

const createvoter = async (req, res) => {
  //const {userId, electionId} = req.body
 // register new user
 const voter = new Voter({

    electionId:req.body.electionId,
    userId:req.user

 })
 console.log(voter)
 const savedvoter = await voter.save();
 

  res.json({
    status: 200,
    message: 'voter created successful',
    successfull:true,
    voter:savedvoter
  })
}


const deleteVoter = async (req, res) =>  {
  const { id: voterId } = req.params
  const voter = await Voter.findOneAndDelete({ _id: voterId })
  if (!voter) {
    return res.json({
      status: 404,
      message: 'No voter with id : ${voterId}',
      successfull:false,
      voter:null
    })
  } 
   res.json({
    status: 200,
    message: 'voter deleted successsfull',
    successfull:true,
    voter:voter
  })
}

const viewVoter = async (req, res) => {         

const voter = await Voter.aggregate([
  {
         $lookup:{
             from:"users",
             localField:"userId",
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
     {
      $lookup:{
          from:"elections",
          localField:"_id",
          foreignField:"electionId",
          as:"elections",
      },
  },
  {
    $unwind:{
      path: "$elections",
    preserveNullAndEmptyArrays: true,
    }
  },
])
.exec()
 if (!voter) {
     return res.json({
     status:401,
     massage:' no voter to display' ,
     successfull:false,
     voter:null
     })
 }
 return res.json({
 status:200,
 massage: 'successfull voters',
 successfull:true,
 voter:voter
  })
}

 const updateVoter = async (req, res) => {
  const { id: voterId } = req.params

  const voter = await Voter.findOneAndUpdate({ _id: voterId }, req.body, {
    new: true,
    runValidators: true,
  })

  if (!voter) {
    return res.json({
      status: 404,
      message: 'No voter with id : ${voterId}',
      successfull:true,
      voter:null
    })
  }

  res.json({
    status: 200,
    message: 'voter updated successsfull',
    successfull:true,
    voter:voter
  })
}




  module.exports = {
    createvoter,
    deleteVoter,
    viewVoter,
    updateVoter
  }