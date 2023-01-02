const express = require('express');
const router = express.Router()
const ElectionBody = require('../models/electionBody')
const Verify = require('../routes/verifytoken')


router.post('/createElectionBody',Verify, async (req, res) => {
  const {name, address} = req.body
 // register new user
 const electionBody = new ElectionBody({
    name, 
    address,
    electoralBodySuperAdminId:req.user
 })
 const savedElectionBody = await electionBody.save();
 

  res.json({
    status: 200,
    message: 'election body created successful',
    successfull:true,
    electionBody:savedElectionBody
  })
})

router.delete('/:id/deleteelectionBody',Verify, async (req, res) =>  {
  const { id: electionId } = req.params
  const deleteelectionBody = await ElectionBody.findOneAndDelete({ _id: electionId })
  if (!deleteelectionBody) {
    return res.json({
      status: 404,
      message: 'No election with id : ${electionId}',
      successfull:false,
      election:null
    })
  } 
   res.json({
    status: 200,
    message: 'electionbody deleted successsfull',
    successfull:true,
    deleteElection:deleteelectionBody
  })
})

router.get('/viewelectionbody', Verify, async (req, res) => {         

const electionbody = await ElectionBody.aggregate([
  {
         $lookup:{
             from:"users",
             localField:"electoralBodySuperAdminId",
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
 if (!electionbody) {
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
 electionbodys:electionbody
  })
})

router.put('/:id/updateelectionBody',Verify, async (req, res) => {
  const { id: electionBodyId } = req.params

  const updateElectionbody = await ElectionBody.findOneAndUpdate({ _id: electionBodyId }, req.body, {
    new: true,
    runValidators: true,
  })

  if (!updateElectionbody) {
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
    Electionbody:updateElectionbody
  })
})




  module.exports = router