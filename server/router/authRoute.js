const express = require('express');
const User = require('../models/users.model');
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("../utilities");

const router = express.Router(); // Create a new router instance

//Create Account
router.post("/create-Account", async(req, res) => {
    const {name, email, password, isDeleted} = req.body;

    if(!name){
        return res.status(400).json({error : true, message : "name is required"});
    }

    if(!email){
        return res.status(400).json({error : true, message : "email is required"});
    }

    if(!password){
        return res.status(400).json({error : true, message : "password is required"});
    }


    const isUser = await User.findOne({email : email});

    if(isUser){
        return res.json({
            error : true, 
            message : "user already exits"
        })
    }

    const users = new User({
        name,
        email,
        password,
        isDeleted,
    });

    await users.save();

    const accessToken = jwt.sign({ users }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "36000m",
    });

    return res.json({
        error: false,
        users,
        accessToken,
        message: "Registration Successful",
    });
})

module.exports = router;