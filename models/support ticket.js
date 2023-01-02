const mongoose = require('mongoose')

const supportTicketSchema = new mongoose.Schema({
tittle:{
        type:String,
        required:true
  },
  description:{
      type:String,
      required:true
  },
  phone: {
    type: Number,
    default: true,
  },
  email: {
    type: String,
    default: true,
  },
  address: {
    type: String,
    default: true,
  },
  electionId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Election'
  },

    Date: {
        type: Date,
        default: Date.now,
      },
})

module.exports = mongoose.model("SupportTicket", supportTicketSchema)   