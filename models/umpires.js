const mongoose = require('mongoose')

const umpireSchema = new mongoose.Schema({
    userId:{
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

module.exports = mongoose.model("Umpire", umpireSchema)   