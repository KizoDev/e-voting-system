const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config();

    
const addNewPassword = async(req, res) => {
  const newPassword = req.body.newPassword
  const sentToken = req.body.resetToken
  const userId = req.body.userId
  const user = await User.findById(userId)
    if (user == null) {
      return res.json({
          status:401,
          massage:'userId is invalid',
          successfull:false,
          data:null
          })
    }
    if (user.resetToken != sentToken) {
      return res.json({
          status:401,
          massage:'token is invalid',
          successfull:false,
          data:null
          })
    }

    const hashpassword = await bcrypt.hash(newPassword, 10)
    user.password = hashpassword
    const updateuser = await User.updateOne({_id:userId}, user  )
    if (updateuser) {
      return res.json({
          status:200,
          massage:'user password updated',
          successfull:false,
          data:null
          })
    }
    
  }
module.exports = {addNewPassword}
