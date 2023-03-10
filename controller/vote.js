const express = require('express');
const Vote = require('../models/votes')
const Voter = require('../models/voters')
const authPage = require('../middleware/authPage')
const Verify = require('../routes/verifytoken')
const ElectionBodyAdmin = require('../models/electionBodyAdmin')

const createvote = async (req, res) => {
  const {electionCandidateId, electionId} = req.body

  //check if user is registered for the election
  const voter = await Voter.findOne({userId: req.user._id, electionId});
  // console.log(typeof voter)
  if(voter == null) {
    return res.json({
      status: 400,
      message: "You are not registered for this election",
      successful: false,
    });
  }
 // register new user
 const vote = new Vote({
    userId:req.user,
    electionId,
    electionCandidateId
 })
 const savedvote = await vote.save();

  res.json({
    status: 200,
    message: 'voted successful',
    successfull:true,
    vote:savedvote
  })
}


const deleteVote = async (req, res) =>  {
  const { id: voteId } = req.params

  // const user = await ElectionBodyAdmin.findOne({electoralBodyAdminId: req.user._id })
  // if(user == null) {
  //   return res.json({
  //     status: 400,
  //     message: "You are not allowed to delete vote",
  //     successful: false,
  //   });
  // }
  const vote = await Vote.findOneAndDelete({ _id: voteId })
  if (!vote) {
    return res.json({
      status: 404,
      message: 'No vote with the id : ${voteId}',
      successfull:false,
      vote:null
    })
  } 
   res.json({
    status: 200,
    message: 'vote deleted successsfull',
    successfull:true,
    vote:vote
  })
}

const viewVote = async (req, res) => {         
const vote = await Vote.aggregate([
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
])
.exec()
 if (!vote) {
     return res.json({
     status:401,
     massage:' no vote to display' ,
     successfull:false,
     vote:null
     })
 }
 return res.json({
 status:200,
 massage: 'successfull votes',
 successfull:true,
 vote:vote
  })
}

const updateVote = async (req, res) => {
  const { id: voteId } = req.params
  // const user = await ElectionBodyAdmin.findOne({electoralBodyAdminId: req.user._id })
  // if(user == null) {
  //   return res.json({
  //     status: 400,
  //     message: "You are not allowed to update vote",
  //     successful: false,
  //   });
  // }
  const vote = await Vote.findOneAndUpdate({ _id: voteId }, req.body, {
    new: true,
    runValidators: true,
  })

  if (!vote) {
    return res.json({
      status: 404,
      message: 'No vote with id : ${voteId}',
      successfull:true,
      vote:null
    })
  }

  res.json({
    status: 200,
    message: 'vote updated successsfull',
    successfull:true,
    vote:vote
  })
}

  module.exports = {
    createvote,
    deleteVote,
    viewVote,
    updateVote
  }