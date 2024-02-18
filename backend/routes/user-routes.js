const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User= require('../models/user');
const { error } = require('console');
const jwt = require('jsonwebtoken');

router.post('/signup',(req,res,next)=>{
    bcrypt.hash(req.body.password,10)
    .then(hash=>{
        const user= new User({
            userName: req.body.userName,
            password:hash
        });
        user.save().then(userDetails=>{
            res.status(201).json({
                message: 'User is created successfully',
                userData:{userDetails}
            });
        })
        .catch(error =>{
            res.status(500).json({
                message: "Error fetching user details",
                error: error.message,
            })
        })
    })
});
router.post("/login",(req,res,next)=>{
    // let userDetails;
    const userDetails = User.findOne({'userName':req.body.userName}).then(user=>{
    if(!user){
       return res.status(401).json({
            message:"invalid user",
        });
    }
    // userDetails=user;
    return bcrypt.compare(req.body.password,user.password)

})
.then(result =>{
    if(!result){
        return res.status(401).json({
            message:"invalid user",
        });
    }
    const token = jwt.sign({userName:userDetails.userName,_id:userDetails._id},"secret_this_should_be_longer",{expiresIn:"1h"})
    res.status(200).json({token:token})
})
.catch(error=>{
    return res.status(401).json({
        message:"invalid user"
    });
})
})
module.exports=router;