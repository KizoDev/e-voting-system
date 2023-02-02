const express = require('express')
const multer = require("multer")
const cloudinary = require('../middleware/image')
const User = require('../models/user')
  

const photo = async (req, res) => {
  const {user} = req
    if (!user) {
        return res.json({
            status:401,
            massage:'unauthorized access',
            successfull:false,
            data:null
            })
    }

    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
            public_id: `${user._id}_profile`,
            width: 500,
            height: 500,
            crop :"fill"
        })  
        await User.findByIdAndUpdate(user.id, {avatar:result.url})
        res.json({
            status:200,
            massage: 'profile Picture successfully uploaded',
            successfull:true,
            }) 
    } catch (error) {
        console.log(error);
    }
       
  
}
module.exports = {photo}