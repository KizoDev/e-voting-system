const express = require('express');
const router = express.Router()
const SupportTicket = require('../models/support ticket')
const authPage = require('../middleware/authPage')
const Verify = require('../routes/verifytoken')


router.post('/createSupportTicket',Verify, async (req, res) => {
  const {tittle, description, electionId, email, phone, address} = req.body
 // register new user
 const supportTicket = new SupportTicket({
     tittle,
     description,
     electionId, 
     email, 
     phone, 
     address

 })
 const savedSupportTicket = await supportTicket.save();
 

  res.json({
    status: 200,
    message: 'registerd successful',
    successfull:true,
    supportTicket:savedSupportTicket
  })
})



router.delete('/:id/deleteSupportTicket',Verify, async (req, res) =>  {
  const { id: supportTicketId } = req.params
  const supportTicket = await SupportTicket.findOneAndDelete({ _id: supportTicketId })
  if (!supportTicket) {
    return res.json({
      status: 404,
      message: 'No support ticket with id : ${electionId}',
      successfull:false,
      election:null
    })
  } 
   res.json({
    status: 200,
    message: 'support ticket deleted successsfull',
    successfull:true,
    deleteElection:supportTicket
  })
})

router.get('/viewSupportTicket', Verify, async (req, res) => {         

const supportTicket = await SupportTicket.aggregate([
  {
         $lookup:{
             from:"elections",
             localField:"electoinId",
             foreignField:"_id",
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
 if (!supportTicket) {
     return res.json({
     status:401,
     massage:' no supportTicket to display' ,
     successfull:false,
     elections:null
     })
 }
 return res.json({
 status:200,
 massage: 'successfull supportTicket',
 successfull:true,
 supportTicket:supportTicket
  })
})

router.put('/:id/updateSupportTicket',Verify, async (req, res) => {
  const { id: supportTicketId } = req.params

  const supportTicket = await SupportTicket.findOneAndUpdate({ _id: supportTicketId }, req.body, {
    new: true,
    runValidators: true,
  })

  if (!supportTicket) {
    return res.json({
      status: 404,
      message: 'No supportTicket with id : ${Id}',
      successfull:true,
      Electionbody:null
    })
  }

  res.json({
    status: 200,
    message: 'supportTicket updated successsfull',
    successfull:true,
    Electionbody:supportTicket
  })
})




  module.exports = router