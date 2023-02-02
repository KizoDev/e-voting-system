const mongoose = require('mongoose')

const profilePictureSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
      },
      profilePicture: {
        data:Buffer,
        contentType: String,
      },
},
{
  timestamps: true,
})

module.exports = mongoose.model("ProfilePicture", profilePictureSchema)   