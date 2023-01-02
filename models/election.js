const mongoose = require('mongoose')

const electionSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
      },
      electionDate: {
        type: String,
        required:true
      },
      electionTime: {
        type: String,
        required:true
      },
      rule: {
        type: String,
        required:true
      },
      electionBodyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ElectionBody'
      },
    Date: {
        type: Date,
        default: Date.now,
      },
})

module.exports = mongoose.model("Election", electionSchema)   