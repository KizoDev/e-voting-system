const express = require('express');
const router = express.Router()
require('dotenv').config();
const ElectionCandidate = require('../models/electionCandidates')
const Verify = require('../routes/verifytoken')

router.post('/createElectionCandidate',Verify, async (req, res) => {
const electionId = req.body.electionId
 // register new user
 const electionCandidate = new ElectionCandidate({
    electionId:electionId,
    userId:req.user
  })
 const savedElectionCandidate = await electionCandidate.save();
 
  res.json({
    status: 200,
    message: 'electionCandidates registered successful',
    successfull:true,
    electionCandidate:savedElectionCandidate
  })
})

router.delete('/:id/deleteelectionCandidate',Verify, async (req, res) =>  {
  const { id: electionCandidateId } = req.params
  const electionCandidate = await ElectionCandidate.findOneAndDelete({ _id: electionCandidateId })
  if (!electionCandidate) {
    return res.json({
      status: 404,
      message: 'No election with the id : ${Id}',
      successfull:false,
      election:null
    })
  } 
   res.json({
    status: 200,
    message: 'election candidate deleted successsfull',
    successfull:true,
    deleteElection:electionCandidate
  })
})

router.get('/viewElectionCandidate', Verify, async (req, res) => {         

const electionCandidate = await ElectionCandidate.aggregate([
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
 if (!electionCandidate) {
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
 electionbodys:electionCandidate
  })
})

router.put('/:id/updateElectionCandidate',Verify, async (req, res) => {
  const { id: electionCandidateId } = req.params

  const electionCandidate = await ElectionCandidate.findOneAndUpdate({ _id: electionCandidateId }, req.body, {
    new: true,
    runValidators: true,
  })

  if (!electionCandidate) {
    return res.json({
      status: 404,
      message: 'No election candidate with id : ${electionId}',
      successfull:true,
      Electionbody:null
    })
  }

  res.json({
    status: 200,
    message: 'election candidate updated successsfull',
    successfull:true,
    Electionbody:electionCandidate
  })
})



  module.exports = router