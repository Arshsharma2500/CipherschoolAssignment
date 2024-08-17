const express = require('express');
const Submission = require('../models/submissions.model');
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("../utilities");

const router = express.Router(); // Create a new router instance

//Create Account
router.post("/submission", async(req, res) => {
    const {testId, userId, selections, isDeleted} = req.body;

    if(!testId){
        return res.status(400).json({error : true, message : "testId is required"});
    }

    if(!userId){
        return res.status(400).json({error : true, message : "userId is required"});
    }

    if(!selections){
        return res.status(400).json({error : true, message : "selections is required"});
    }


    const isSubmit = await Submission.findOne({userId : userId});

    if(!isSubmit){
        return res.json({
            error : true, 
            message : "user doesn't gave test"
        })
    }

    const submissions = new Submission({
        testId,
        userId,
        selections,
        isDeleted,
    });

    await submissions.save();

    const accessToken = jwt.sign({ submissions }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "36000m",
    });

    return res.json({
        error: false,
        submissions,
        accessToken,
        message: "submission successfull",
    });
})

module.exports = router;