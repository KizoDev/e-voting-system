const User = require('../models/user')
const crypto = require('crypto')
const nodemailer = require('nodemailer')

let mailTransporter = nodemailer.createTransport({
    host: "premium108.web-hosting.com",
    port: 465,
    secure: true,
    auth : {
      user : 'nesitest@andyke.net',
      pass : "ikechukwuapeh"
    },
    t1s:{
      rejectUnauthorized : false
    }
})
  


const resetPassword = (req, res) => {
    crypto.randomBytes(32,(err, buffer) =>{
        if (err) {
            console.log(err);
        }
    
        const token = buffer.toString("hex")
        User.findOne({email:req.body.email})
        .then(user => { 
            if (!user) {
              return res.json({
                  status:401,
                  massage:'no user with the enail',
                  successfull:false,
                  data:null
                  })
            }
        user.resetToken = token
        user.expireToken = Date.now() + 360000
        user.save().then((result) =>{
              mailTransporter.sendMail({
                  to:user.email,
                  from:"nesitest@andyke.net ",
                  subject:"password reset",
                  html:`<p> you requested for password reset </p>
                  <h5> click on this <a href ="http://localhost:7000/addNewPassword/${token}/${user._id}">link</a> to reset your password </h5>`
              })
              return res.json({
                  status:201,
                  massage:'check your email',
                  successfull:true
              })
            })
      })
   })
}

module.exports = {resetPassword}
/*

const User = require('../models/user')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
require('dotenv').config();

let mailTransporter = nodemailer.createTransport({
    host: "premium108.web-hosting.com",
    port: 465,
    secure: true,
    auth : {
      user : 'nesitest@andyke.net',
      pass : "ikechukwuapeh"
    },
    t1s:{
      rejectUnauthorized : false
    }
})
  


const resetPassword = async (req, res) => {
    const user = await User.findOne({email:req.body.email})
        if (!user) {
          return res.json({
              status:401,
              massage:'no user with the email',
              successfull:false,
              data:null
              })
        }
    const token = jwt.sign({_id: user._id}, process.env.KEY_SECRET)
    
        user.resetToken = token
        user.expireToken = Date.now() + 360000
       const saveduser = await user.save()
        .then((result) =>{
              mailTransporter.sendMail({
                  to:user.email,
                  from:"nesitest@andyke.net ",
                  subject:"password reset",
                  html:`<p> you requested for password reset </p>
                  <h5> click on this <a href ="http://localhost:7000/addNewPassword/${token}">link</a> to reset your password </h5>`
              })
              return res.json({
                  status:201,
                  massage:'check your email',
                  successfull:true
              })
       })
}

module.exports = {resetPassword}
*/