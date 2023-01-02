const mongoose = require('mongoose')

const electionBodyAdminSchema = new mongoose.Schema({
  
  electoralBodyAdminId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
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

module.exports = mongoose.model("ElectionBodyAdmin", electionBodyAdminSchema)   